const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["file", "folder"],
      required: true,
    },
    extension: {
      type: String,
      default: null,
    },
    size: {
      type: Number,
      default: 0,
    },
    isCode: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: false,
    },
    analyzed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const ProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sourceType: {
      type: String,
      enum: ["zip", "github"],
      required: true,
    },
    repoUrl: {
      type: String,
      default: null,
    },
    zipPath: {
      type: String,
      default: null,
    },
    workspacePath: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    files: {
      type: [FileSchema],
      default: [],
    },
    language: {
      type: [String],
      default: [],
    },
    filesCount: {
      type: Number,
      default: 0,
    },
    analysis: {
      type: Object,
      default: {},
    },
    dependencyGraph: {
      node: {
        type: [String],
        default: [],
      },
      edges: {
        type: [
          {
            from: String,
            to: String,
            type: {
              type: String,
              default: "import",
            },
          },
        ],
        default: [],
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
