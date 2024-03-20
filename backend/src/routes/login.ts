import express from 'express';
import {Login} from '../database/schema';
import {catchError, notFound} from "../error";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginRouter = express.Router();

loginRouter.get('/', async (req, res) => {
    try {
        const login = await Login.find();
        res.json(login);
    } catch (e) {
        catchError(e, res);
    }
});

loginRouter.post('/api/register', async (req, res) => {

    const emailExist = await Login.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const login = new Login({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const newLogin = await login.save();
        res.status(201).json(newLogin);
    } catch (e) {
        catchError(e, res);
    }
});

loginRouter.post('/api/check_username_availability', function(req, res) {
    checkUsernameAvailability(req.body.username, res);
})

//Check The Username 
function checkUsernameAvailability(username:string, res:any) {
    Login.find({'username': username}, function(err: any, reply: string){
    if(reply == ''){
            res.send({availability: 'available'});
        } else {
            res.send({availability: 'unavailable'});
        }
    })
}

loginRouter.post('/login', async (req, res) => {

    // check if the email exists in the database
    const user = await Login.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email does not exist');

    // check if the password is valid
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // TODO - remove when auth is done
    res.send('Logged in!');

    // create and assign a token - this is the information we're sending to the frontend
    // so that the frontend knows that the user is logged in - user ID is sent but we can
    // send something else as well - like email or username, email is better for uniqueness
    const token = jwt.sign({_id: user._id}, process.env.JWT_TOKEN);
    res.header('auth-token', token).send(token);
});

loginRouter.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const login = await Login.findById(id);
        if (!login) {
            return notFound(res, 'Login');
        }
        res.json(login);
    } catch (e) {
        catchError(e, res);
    }
});


loginRouter.put('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const updatedLogin = await Login.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedLogin) {
            return notFound(res, 'Login');
        }
        res.json(updatedLogin);
    } catch (e) {
        catchError(e, res);
    }
});


loginRouter.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const deletedLogin = await Login.findByIdAndDelete(id);
        if (!deletedLogin) {
            return notFound(res, 'Login');
        }
        res.json({message: 'Login deleted'});
    } catch (e) {
        catchError(e, res);
    }
});

export default loginRouter;