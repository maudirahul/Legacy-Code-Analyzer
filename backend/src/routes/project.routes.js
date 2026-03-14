const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
  handleUpload,
  getProjects,
  getProjectOverView,
  getDependencyGraph,
  getProjectFiles,
  getFileAnalysis,
  deleteProject
} = require("../controllers/project.controller");

//upload route
router.post("/upload", auth, upload.single("file"), handleUpload);

//list projects route
router.get("/", auth, getProjects);

//dependencyGraph
router.get("/:id/graph", auth, getDependencyGraph);

//files tree of a project
router.get("/:id/files", auth, getProjectFiles);

//file analysis
router.get("/:id/file", auth, getFileAnalysis);

//project overview
router.get("/:id", auth, getProjectOverView);

//delete project
router.delete("/:id", auth, deleteProject)

module.exports = router;
