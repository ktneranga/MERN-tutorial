const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const authHandler = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        
        try {
            token = req.headers.authorization.split(' ')[1];
            //decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //check if the user exists in the db
            req.user = await User.findById(decoded.id);
            next();

           } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error('Not authorized');
           }
    }

    if(!token){
        res.status(401);
        throw new Error('Unauthorized, no token');
    }

    next();
})

module.exports ={ authHandler};