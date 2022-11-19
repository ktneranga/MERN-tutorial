const getGoals = async (req, res) => {
    res.status(200).json({ msg: 'Get goald' });
}

const createGoal = async (req, res) => {
    if (req.body.text === undefined) {
        res.status(400);
        throw new Error('Text field is required');
    } else {
        res.json({ msg: req.body.text });
    }
}

const updateGoal = async (req, res) => {
    res.status(200).json({ msg: 'Update goal' });
}

const deleteGoal = async (req, res) => {
    res.status(200).json({ msg: 'Delete goal' });
}

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}