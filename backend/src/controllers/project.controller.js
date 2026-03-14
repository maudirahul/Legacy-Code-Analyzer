const Project = require("../models/project");
const simpleGit = require("simple-git");
const path = require("path");
const fs = require("fs");
const { extractZip } = require("../utils/zip.utils");
const { scanDirectory } = require("../utils/fileScanner");
const { analyzeProject } = require("../services/analysis.service");
const { buildDependencyGraph } = require("../services/dependencyGraph.service");
const {
  getUserProjects,
  getProjectOverviewById,
  getDependencyGraph,
  getProjectFilesTree,
  getAstAnalysisOfFile,
} = require("../services/project.service");

exports.getProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const project = await getUserProjects(userId);

    return res.status(200).json(project);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

exports.getProjectOverView = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const project = await getProjectOverviewById(userId, projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error("GET PROJECT OVERVIEW ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch project overview",
    });
  }
};

exports.getProjectFiles = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const project = await getProjectFilesTree(userId, projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    return res.status(200).json(project.files || []);
  } catch (error) {
    console.error("GET PROJECT FILES ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch project files",
    });
  }
};

exports.getFileAnalysis = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;
    let filePath = req.query.path;

    filePath = filePath.replace(/\\/g, "/");

    if (!filePath) {
      return res.status(400).json({
        message: "File path is required",
      });
    }

    const project = await getAstAnalysisOfFile(userId, projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const fileAnalysis = project.analysis?.files?.[filePath];

    if (!fileAnalysis) {
      return res.status(404).json({
        message: "Analysis not found for this file",
      });
    }

    return res.status(200).json(fileAnalysis);
  } catch (error) {
    console.error("GET FILE ANALYSIS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch file analysis",
    });
  }
};

exports.getDependencyGraph = async (req, res) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const project = await getDependencyGraph(userId, projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const graph = project.dependencyGraph || {
      node: [],
      edges: [],
    };

    return res.status(200).json(graph);
  } catch (error) {
    console.error("GET DEPENDENCY GRAPH ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch dependency graph",
    });
  }
};

/*
  Handles project uploads from ZIP files or GitHub repositories.
  - Extracts or clones the project into a workspace directory
  - Scans project files and stores metadata in the database
  - Does not store actual file contents in the database
*/
exports.handleUpload = async (req, res) => {
  try {
    const { sourceType, projectName, repoUrl } = req.body;
    const userId = req.user.id;

    // Validate source type
    if (!sourceType) {
      return res.status(400).json({ message: "sourceType is required" });
    }

    // Create a unique workspace directory for this project
    const workspacePath = path.join(
      process.cwd(),
      "workspace",
      `${Date.now()}-${userId}`,
    );

    /*
      ZIP upload flow
      - Validate input
      - Extract ZIP
      - Scan files
      - Save project metadata
    */
    if (sourceType === "zip") {
      if (!req.file) {
        return res.status(400).json({ message: "ZIP file required" });
      }

      if (!projectName) {
        return res.status(400).json({ message: "projectName is required" });
      }

      // Create workspace directory
      fs.mkdirSync(workspacePath, { recursive: true });

      // Extract ZIP contents into workspace
      await extractZip(req.file.path, workspacePath);

      // Scan extracted files
      const files = scanDirectory(workspacePath);

      // Save project metadata to database
      const project = await Project.create({
        user: userId,
        name: projectName,
        sourceType,
        workspacePath,
        files,
        status: "processing",
      });

      //ast analysis
      const analysis = await analyzeProject(project);
      //dependency graph
      const dependencyGraph = await buildDependencyGraph({
        files: project.files,
        analysis,
      });

      project.analysis = analysis;
      ((project.dependencyGraph = dependencyGraph),
        (project.status = "completed"));
      await project.save();

      // Remove uploaded ZIP file after successful extraction
      fs.unlink(req.file.path, () => {});

      return res.status(201).json({
        message: "ZIP uploaded successfully",
        projectId: project._id,
      });
    }

    /*
      GitHub upload flow
      - Validate input
      - Clone repository
      - Scan files
      - Save project metadata
    */
    if (sourceType === "github") {
      if (!repoUrl) {
        return res.status(400).json({ message: "repoUrl is required" });
      }

      // Create workspace directory
      fs.mkdirSync(workspacePath, { recursive: true });

      // Clone GitHub repository into workspace
      await simpleGit().clone(repoUrl, workspacePath);

      // Derive project name from repository URL
      const repoName = repoUrl.split("/").pop().replace(".git", "");

      // Scan cloned repository files
      const files = scanDirectory(workspacePath);

      // Save project metadata to database
      const project = await Project.create({
        user: userId,
        name: repoName,
        sourceType,
        repoUrl,
        workspacePath,
        files,
        status: "processing",
      });

      //ast analysis
      const analysis = await analyzeProject(project);

      //dependency graph
      const dependencyGraph = await buildDependencyGraph({
        files: project.files,
        analysis,
      });

      project.analysis = analysis;
      ((project.dependencyGraph = dependencyGraph),
        (project.status = "completed"));
      await project.save();

      return res.status(201).json({
        message: "Repository cloned successfully",
        projectId: project._id,
      });
    }

    // Handle unsupported source types
    return res.status(400).json({ message: "Invalid sourceType" });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};

// DELETE /api/project/:id
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id; 

    // Ensure they only delete their own project!
    const deletedProject = await Project.findOneAndDelete({ 
      _id: projectId, 
      user: userId 
    });

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    return res.status(500).json({ message: "Internal server error during deletion" });
  }
};