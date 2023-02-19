const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user._id });
  res.status(200).json({
    status: true,
    goals: goals,
  });
});

const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Input field is required");
  }

  const goal = await Goal.create({
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    throw new Error("Text field is required!");
  }

  const goal = await Goal.findById(req.params.id);

  const user = await User.findById(req.user.id);

  if (!goal) {
    res.status(404);
    throw new Error("Data not found!");
  }

  if (!user) {
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: true,
    updated_goal: updatedGoal,
  });
});

const deleteGoal = asyncHandler(async (req, res) => {
  // const goal = await Goal.findById(req.params.id);

  // if (!goal) {
  //     res.status(404);
  //     throw new Error('Goal not found');
  // }

  // await goal.remove();

  const result = await Goal.findByIdAndRemove(req.params.id);

  if (!result) {
    res.status(404);
    throw new Error("Goal not found");
  } else {
    res.status(200).json({
      status: true,
      msg: "Goal deleted!",
      id: req.params.id,
    });
  }
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
