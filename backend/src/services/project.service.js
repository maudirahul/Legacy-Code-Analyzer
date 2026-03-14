const Project = require("../models/project");

const getUserProjects = async (userId) => {
  const projects = await Project.find({ user: userId })
    .select("name sourceType status filesCount languages createdAt")
    .sort({ createdAt: -1 });

  return projects;
};

const getProjectOverviewById = async (userId, projectId) => {
  const projects = await Project.findOne({
    _id: projectId,
    user: userId,
  }).select("name sourceType status filesCount languages createdAt");

  return projects;
};

const getDependencyGraph = async (userId, projectId) => {
  const projects = await Project.findOne({
    _id: projectId,
    user: userId,
  }).select("dependencyGraph");

  return projects;
};

const getProjectFilesTree = async (userId, projectId) => {
  const projects = await Project.findOne({
    _id: projectId,
    user: userId,
  }).select("files");

  return projects;
};

const getAstAnalysisOfFile = async (userId, projectId) => {
  const projects = await Project.findOne({
    _id: projectId,
    user: userId,
  }).select("analysis");

  return projects;
};

module.exports = {
  getUserProjects,
  getProjectOverviewById,
  getDependencyGraph,
  getProjectFilesTree,
  getAstAnalysisOfFile,
};
