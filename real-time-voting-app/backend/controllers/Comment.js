const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const { pollId, text, parentComment } = req.body;
  try {
    const comment = new Comment({
      pollId,
      text,
      createdBy: req.user._id,
      parentComment: parentComment || null,
    });
    await comment.save();

    const comments = await Comment.find({ pollId })
      .populate("createdBy")
      .populate("parentComment");
    const io = req.app.get("io");
    io.emit("commentUpdate", comments); 

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  const { pollId } = req.params;
  try {
    const comments = await Comment.find({ pollId })
      .populate("createdBy")
      .populate("parentComment");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
