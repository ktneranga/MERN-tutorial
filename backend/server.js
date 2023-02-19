const express = require("express");
//in order to have env
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000
const goalsRouter = require('./routes/GoalRoutes');
const userRouter = require('./routes/UserRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const {authHandler} = require('./middlewares/authMiddleware');
const connectDb = require('./config/db');

connectDb();
const app = express();

//inorder to use body data of request we need to have couple of middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalsRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);
app.use(authHandler);


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));