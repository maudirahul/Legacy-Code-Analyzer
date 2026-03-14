require("dotenv").config();
const Project = require("../models/project");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function buildPrompt(context, instruction) {
  return `
You are a software architecture assistant.
Base your explanation strictly on the provided information.

${context}

Instruction:
${instruction}
`;
}

function getInstruction(promptType, promptKey, userPrompt, detailLevel) {
  const detailText =
    detailLevel === "detailed"
      ? "Provide a detailed explanation."
      : "Provide a concise explanation in 3-4 sentences.";

  if (promptType === "predefined") {
    const prompts = {
      file_role: "Explain the role of this file in the project.",
      dependencies: "Explain this file's dependencies and why they exist.",
      where_to_start:
        "Explain if this file is a good starting point for understanding the project.",
    };

    return `${prompts[promptKey]} ${detailText}`;
  }

  if (promptType === "custom") {
    return `${userPrompt} ${detailText}`;
  }

  return "Explain this file.";
}

async function generateExplanation({
  projectId,
  userId,
  filePath,
  promptType,
  promptKey,
  userPrompt,
  detailLevel,
}) {
  const project = await Project.findOne({
    _id: projectId,
    user: userId,
  });

  if (!project) throw new Error("Project not found");

  const fileAnalysis = project.analysis?.files?.[filePath];
  if (!fileAnalysis) throw new Error("File analysis not found");

  const graph = project.dependencyGraph || { nodes: [], edges: [] };

  const outgoing = graph.edges.filter((edge) => edge.from === filePath);

  const incoming = graph.edges.filter((edge) => edge.to === filePath);

  const context = `
Project: ${project.name}

File: ${filePath}

Imports:
${fileAnalysis.imports.join("\n") || "none"}

Exports:
${fileAnalysis.exports.join("\n") || "none"}

Functions:
${fileAnalysis.functions.join("\n") || "none"}

Classes:
${fileAnalysis.classes.join("\n") || "none"}

Dependency Graph Context:

This file depends on ${outgoing.length} internal files.
This file is used by ${incoming.length} internal files.

Files that import this file:
${incoming.map((e) => e.from).join("\n") || "none"}

Files this file imports:
${outgoing.map((e) => e.to).join("\n") || "none"}
`;

  const instruction = getInstruction(
    promptType,
    promptKey,
    userPrompt,
    detailLevel,
  );

  const finalPrompt = buildPrompt(context, instruction);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.3,
      },
    });

    // Generate Content
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate explanation");
  }
}

function buildProjectContext(project) {
  // Use optional chaining and default to empty arrays
  const safeFiles = project.files || [];
  const totalFiles = safeFiles.length;

  const jsFiles = safeFiles.filter((f) => f.language === "javascript");

  // Safely map over the guaranteed array
  const topLevelFolders = [
    ...new Set(safeFiles.map((f) => f.path.split("/")[0]).filter(Boolean)),
  ];

  const graph = project.dependencyGraph || {};
  const safeNodes = graph.nodes || [];
  const safeEdges = graph.edges || [];

  const mostConnected = {};

  const edgesList = project.dependencyGraph.edges
    .slice(0, 50) // prevent huge prompts
    .map((e) => `${e.from} -> ${e.to}`)
    .join("\n");

  for (const edge of safeEdges) {
    mostConnected[edge.from] = (mostConnected[edge.from] || 0) + 1;
  }

  const topFiles = Object.entries(mostConnected)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([file]) => file);

  return `
Project Name: ${project.name}

Total Files: ${totalFiles}
JavaScript Files: ${jsFiles.length}

Top-Level Folders:
${topLevelFolders.join("\n") || "None"}

Dependency Graph:
Total Nodes: ${safeNodes.length}
Total Edges: ${safeEdges.length}

Dependency Connections:
${edgesList || "No internal connections found."}

Most Connected Files:
${topFiles.join("\n") || "None"}
`;
}

async function generateChatResponse({ projectId, userId, messages, filePath }) {
  const project = await Project.findOne({
    _id: projectId,
    user: userId,
  });

  if (!project) throw new Error("Project not found");

  const context = buildProjectContext(project);

  let fileContext = "No specific file selected.";

  if (filePath && project.analysis?.files?.[filePath]) {
    const fileAnalysis = project.analysis.files[filePath];
    fileContext = `
    The user is currently looking at: ${filePath}
    
    File Imports: ${fileAnalysis.imports.join(", ") || "none"}
    File Exports: ${fileAnalysis.exports.join(", ") || "none"}
    File Functions: ${fileAnalysis.functions.join(", ") || "none"}
    File Classes: ${fileAnalysis.classes.join(", ") || "none"}
    `;
  }

  const systemInstructionText = `
You are a codebase structure assistant.
Only answer questions about the provided project structure.
Do NOT answer general programming questions.
If a question is outside scope, reply:
"This question is outside the project structure scope."

Project Context:
${context}
;
Current File Context:
${fileContext}
`;

  const chatHistory = messages.filter((msg) => msg.role !== "system");

  let limitedMessages = chatHistory.slice(-6);

  if (limitedMessages.length > 0 && limitedMessages[0].role === "assistant") {
    limitedMessages = limitedMessages.slice(1);
  }

  const formattedMessages = limitedMessages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content || " " }],
  }));

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: systemInstructionText,
  });

  const response = await model.generateContent({
    contents: formattedMessages,
    generationConfig: {
      temperature: 0.3,
    },
  });

  return response.response.text();
}

module.exports = {
  generateExplanation,
  generateChatResponse,
};
