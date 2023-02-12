const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find();
        res.status(200).json(goals);
    } catch (error) {
        throw new Error(error);
    }
}

const createGoal = asyncHandler(async (req, res) => {
    if (req.body.text === undefined) {
        res.status(400)
        throw new Error('Input field is required');
    }

    const goal = await Goal.create({
        text: req.body.text
    });
    res.status(200).json({
        status: true,
        goal: goal
    });
})

// const createGoal = async (req, res) => {

//     try {
//         if (req.body.text === undefined) {
//             res.status(400);
//             throw new Error('Text field is required');
//         }
//         const goal = await Goal.create({
//             text: req.body.text
//         });
//         res.status(201).json(goal);
//     } catch (error) {
//         res.status(400).json({
//             status: false,
//             msg: error.message
//         });
//     }

// }

const updateGoal = asyncHandler(async (req, res) => {
    if (req.body.text === undefined) {
        throw new Error('Text field is required!')
    }

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404)
        throw new Error('Data not found!')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
        status: true,
        updated_goal: updatedGoal
    });

})

const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    await goal.remove();

    res.status(200).json({
        status: true,
        msg: "Goal deleted",
        id: req.params.id
    })

})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}