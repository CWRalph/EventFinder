import express from 'express';
import {User} from '../database/schema';
import {catchError, notFound} from "../error";

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        catchError(e, res);
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
userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return notFound(res, 'User');
        }
        res.json(user);
    } catch (e) {
        catchError(e, res);
    }
});

userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if a user with the provided username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same username or email already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json(newUser); // Return the newly created user
    } catch (e) {
        catchError(e, res);
    }
});

export default userRouter;