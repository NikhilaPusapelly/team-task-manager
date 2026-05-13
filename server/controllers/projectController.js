const Project = require("../models/Project");

// Create Project
const createProject = async (req, res) => {
  try {

    const { name, description, members } = req.body;

    const project = await Project.create({
      name,
      description,
      members,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get Projects
const getProjects = async (req, res) => {
  try {

    const projects = await Project.find()
      .populate("members", "name email")
      .populate("createdBy", "name email");

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete Project
const deleteProject = async (req, res) => {
  try {

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject,
};