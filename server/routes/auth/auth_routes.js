const express = require("express");
const router = express.Router();
const {registerUser, loginUser, logoutUser, authMiddleware} = require('../../controlers/auth_controllers')


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

router.route('/check-auth').get(authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json(
        {
            success: true,
            message: 'User is Authenticated',
            user,
        }
    )
})


module.exports =router;