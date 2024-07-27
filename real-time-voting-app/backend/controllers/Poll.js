
const Poll = require("../models/Poll");
const User = require("../models/User");

exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const { _id: createdBy } = req.user;

    const formattedOptions = options.filter(
      (option) => option.text.trim() !== ""
    );
    if (formattedOptions.length === 0) {
      throw new Error("At least one option is required.");
    }

    const newPoll = new Poll({
      question,
      options: formattedOptions,
      createdBy,
    });
    const savedPoll = await newPoll.save();

    await User.findByIdAndUpdate(createdBy, {
      $push: { createdPolls: savedPoll._id },
    });

  
    const io = req.app.get("io");
    io.emit("pollUpdate", await Poll.find().populate("createdBy", "name"));

    res.status(201).json(savedPoll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.votePoll = async (req, res) => {
  const { pollId } = req.params;
  const { option } = req.body;
  const userId = req.user._id;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (req.user.votedPolls.includes(pollId)) {
      return res
        .status(400)
        .json({ message: "User has already voted on this poll" });
    }

    const pollOption = poll.options.find((opt) => opt.text === option);
    if (!pollOption) {
      return res.status(400).json({ message: "Invalid option" });
    }

    pollOption.votes += 1;
    await poll.save();

    await User.findByIdAndUpdate(userId, { $push: { votedPolls: pollId } });


    const io = req.app.get("io");
    io.emit("pollUpdate", await Poll.find().populate("createdBy", "name"));

    res.status(200).json({ message: "Vote recorded successfully", poll });
  } catch (error) {
    console.error("Error voting on poll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate("createdBy", "name");
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

