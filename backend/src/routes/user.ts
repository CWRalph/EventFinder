import express from 'express';
import {User} from '../database/schema';
import {catchError, notFound} from "../error";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        catchError(e, res);
    }
});

userRouter.get('/search', async (req, res) => {
    const { query } = req.query as any;

    const pipeline = [
        {
            $search: {
                index: "UserAutocompleteIndex",
                compound: {
                    should: [
                        {
                            autocomplete: {
                                query: query,
                                path: "email"
                            }
                        },
                        {
                            autocomplete: {
                                query: query,
                                path: "username"
                            }
                        },
                        {
                            autocomplete: {
                                query: query,
                                path: "_id"
                            }
                        }
                    ],
                }
            },
        }
    ];

    try {
        //Sort descending order
        const result = await User.aggregate(pipeline).sort({score:-1});
        console.log("Search results: ", result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }


});

userRouter.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (e) {
        catchError(e, res);
    }
});

userRouter.post('/register', async (req, res) => {

    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const newUser = await user.save();
        const token = jwt.sign({_id: newUser._id}, process.env.JWT_TOKEN);
        res.status(201).json({_id: newUser._id, token});
    } catch (e) {
        catchError(e, res);
    }
});

// userRouter.post('/check_username_availability', function(req, res) {
//     checkUsernameAvailability(req.body.username, res);
// })
//
// //Check The Username
// function checkUsernameAvailability(username:string, res:any) {
//     User.find({'username': username}, function(err: any, reply: string){
//     if(reply == ''){
//             res.send({availability: 'available'});
//         } else {
//             res.send({availability: 'unavailable'});
//         }
//     })
// }

userRouter.post('/login', async (req, res) => {

    // check if the email exists in the database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email does not exist');

    // check if the password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // res.json(user);

    // create and assign a token - this is the information we're sending to the frontend
    // so that the frontend knows that the user is logged in - user ID is sent but we can
    // send something else as well - like email or username, email is better for uniqueness
    console.log("Worked", user)
    const token = jwt.sign({_id: user._id}, process.env.JWT_TOKEN);
    console.log(token);
    // res.header('auth-token', token).send(token);
    
    // send user ID and token to the frontend
    res.json({ _id: user._id, token });
});

// Middleware to check if token is valid
function authenticateToken(req:any, res:any, next:any) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, 'secret', (err:any, user:any) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      console.log(user);
      next();
    });
}

userRouter.get('/authenticate', async(req:any, res:any, next) => {
    // middleware function to verify whether the user is authenticated
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access Denied');
    try {
        // this line verifies the token and decodes it to get the user information
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        const userId = decodedToken._id; // assuming the user ID is stored in the token
        res.json(userId); // send the user ID in the response
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
});


userRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return notFound(res, 'User');
        }
        res.json(user);
    } catch (e) {
        catchError(e, res);
    }
});


userRouter.put('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedUser) {
            return notFound(res, 'User');
        }
        res.json(updatedUser);
    } catch (e) {
        catchError(e, res);
    }
});


userRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return notFound(res, 'User');
        }
        res.json({message: 'User deleted'});
    } catch (e) {
        catchError(e, res);
    }
});

//TEMP LOGIN ENDPOINTS
// userRouter.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username, password });
//         if (!user) {
//             return notFound(res, 'User');
//         }
//         res.json(user);
//     } catch (e) {
//         catchError(e, res);
//     }
// });

// userRouter.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         // Check if a user with the provided username or email already exists
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//         if (existingUser) {
//             return res.status(400).json({ error: 'User with the same username or email already exists' });
//         }

//         // Create a new user
//         const newUser = new User({ username, email, password });
//         await newUser.save();

//         res.status(201).json(newUser); // Return the newly created user
//     } catch (e) {
//         catchError(e, res);
//     }
// });

export default userRouter;