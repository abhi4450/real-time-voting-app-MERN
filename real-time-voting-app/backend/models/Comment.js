const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    parentComment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
