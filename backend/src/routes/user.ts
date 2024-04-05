import express from 'express';
import {User} from '../database/schema';
import {catchError, notFound} from "../error";
const bcrypt = require('bcrypt');
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
                index: 'UserSearchIndex',
                text: {
                    query,
                    path: ['username', 'email'], // Example fields to search
                    fuzzy: {} // Optional: fuzzy matching options
                }
            }
        },
        {
            $project: {
                _id: 0,
                score: { $meta: 'searchScore' },
                username: 1,
                email: 1
            }
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
        res.status(201).json(newUser);
    } catch (e) {
        catchError(e, res);
    }
});

userRouter.post('/check_username_availability', function(req, res) {
    checkUsernameAvailability(req.body.username, res);
})

//Check The Username 
function checkUsernameAvailability(username:string, res:any) {
    User.find({'username': username}, function(err: any, reply: string){
    if(reply == ''){
            res.send({availability: 'available'});
        } else {
            res.send({availability: 'unavailable'});
        }
    })
}

userRouter.post('/login', async (req, res) => {

    // check if the email exists in the database
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email does not exist');

    // check if the password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    res.json(user);

    // TODO - remove when auth is done
    // create and assign a token - this is the information we're sending to the frontend
    // so that the frontend knows that the user is logged in - user ID is sent but we can
    // send something else as well - like email or username, email is better for uniqueness
    // const token = jwt.sign({_id: user._id}, process.env.JWT_TOKEN);
    // res.header('auth-token', token).send(token);
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