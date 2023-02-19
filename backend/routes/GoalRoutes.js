const express = require("express");
const router = express.Router();
const { authHandler } = require("../middlewares/authMiddleware");

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/GoalController");

router.get("/", authHandler, getGoals);
router.post("/", authHandler, createGoal);
router.put("/:id", authHandler, updateGoal);
router.delete("/:id", authHandler, deleteGoal);

// router.route('/').get(getGoals).post(createGoal);
// router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
