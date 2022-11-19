const express = require("express");
//in order to have env
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000
const router = require('./routes/GoalRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

//inorder to use body data of request we need to have couple of middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));