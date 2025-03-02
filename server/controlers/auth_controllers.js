
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js')

const JWT_SECRETE_KEY = 'MyEcommerceProject'

//register

const registerUser = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        let userExits = await User.findOne({ 'email': email });

        if (userExits) {
            return res.status(200).json(
                {
                    success: false,
                    message: 'User already exits with same email'
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, password: hashedPassword,
        })

        await newUser.save();

        res.status(200).json(
            {
                success: true,
                message: 'Registration Succesfull'
            }
        )
        console.log(" RegControler:  New User Registered Succesfully");

    }
    catch (err) {
        console.log("Error From register controler:", err);
        res.status(500).json(
            {
                success: false,
                message: 'Some error occur at register controler'
            }
        )
    }
}


//login

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        // console.log(email)

        let userExits = await User.findOne({ 'email': email });
        // console.log(userExits);

        if (!userExits) {
            return res.status(200).json(
                {
                    success: false,
                    message: 'User Does Not Exits'
                }
            )
        }

        let hashedPassword = userExits.password;

        let isPasswoardCorrect = await bcrypt.compare(password, hashedPassword);

        if (!isPasswoardCorrect) {
            return res.status(200).json(
                {
                    success: false,
                    message: 'Password is incorret'
                }
            )
        }

        const token = jwt.sign(
            {
                id: userExits._id,
                role: userExits.role,
                email: userExits.email,
                username: userExits.username,

            },

            JWT_SECRETE_KEY,

            {
                expiresIn: '60m'
            }
        )

        // res.cookie('token',token,{httpOnly:true,secure:true}).json(
        //     {
        //        
        //         user:{
        //             email: userExits.email,
        //             role: userExits.role,
        //             id: userExits._id,
        //             username: userExits.username,
        //         }
        //     }
        // )

        res.status(200).json(
            {
                success: true,
                messagae: "Loggin Successfull",
                token,
                user: {
                    email: userExits.email,
                    role: userExits.role,
                    id: userExits._id,
                    username: userExits.username,
                }
            }
        )
    }
    catch (err) {
        console.log("Error From login controller:", err);

        res.status(500).json(
            {
                success: false,
                message: 'Some error occur at login controller'
            }
        )
    }
}


// logout

const logoutUser = async (req, res) => {

    res.clearCookie('token').json(
        {
            success: true,
            messsage: "User logout Succesfully"
        }
    )
}

// auth Middlewares

// const authMiddleware = async (req, res, next) => {

//     const token = req.cookies.token;
//     // console.log(token);
//     if (!token) {
//         return res.status(401).json(
//             {
//                 success: false,
//                 messagae: 'Unauthrized User'
//             }
//         )
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRETE_KEY);
//         console.log(decoded);
//         req.user = decoded;
//         next();
//     }
//     catch (err) {
//         console.log("Error from authMiddleware: ", err);
//         return res.status(401).json(
//             {
//                 success: false,
//                 messagae: 'Unauthrized User'
//             }
//         )
//     }

// }


const authMiddleware = async (req, res, next) => {
    
    let authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    // const token = req.cookies.token;
    // console.log(token);
    if (!token) {
        return res.status(401).json(
            {
                success: false,
                messagae: 'Unauthrized User'
            }
        )
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRETE_KEY);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log("Error from authMiddleware: ", err);
        return res.status(401).json(
            {
                success: false,
                messagae: 'Unauthrized User'
            }
        )
    }

}



module.exports = { registerUser, loginUser, logoutUser, authMiddleware };