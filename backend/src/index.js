const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { User, Event, Group, Friendship, Membership } = require('./db');
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// Routes for USER model
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/users', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.put('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Routes for GROUP model
app.get('/groups', async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/groups', async (req, res) => {
    const { groupName, description, visibility } = req.body;
    const newGroup = new Group({ groupName, description, visibility });

    try {
        const savedGroup = await newGroup.save();
        res.status(201).json(savedGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/groups/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const group = await Group.findById(id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(group);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/groups/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedGroup = await Group.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(updatedGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/groups/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGroup = await Group.findByIdAndDelete(id);
        if (!deletedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json({ message: 'Group deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// For GROUP MEMBERSHIP model
app.get('/group-memberships', async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.json(memberships);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/group-memberships', async (req, res) => {
    const { group: groupId, user: userId, role } = req.body;

    try {
        const group = await Group.findById(groupId);
        const user = await User.findById(userId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newMembership = new Membership({ group: groupId, user: userId, role });
        await newMembership.save();

        res.status(201).json(newMembership);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/group-memberships/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const membership = await Membership.findById(id);
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }
        res.json(membership);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/group-memberships/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedMembership = await Membership.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMembership) {
            return res.status(404).json({ message: 'Membership not found' });
        }
        res.json(updatedMembership);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/group-memberships/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMembership = await Membership.findByIdAndDelete(id);
        if (!deletedMembership) {
            return res.status(404).json({ message: 'Membership not found' });
        }
        res.json({ message: 'Membership deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// For FRIENDSHIP model
app.post('/friendships', async (req, res) => {
    const { user1: user1Id, user2: user2Id, status } = req.body;

    try {
        const user1 = await User.findById(user1Id);
        const user2 = await User.findById(user2Id);

        if (!user1 || !user2) {
            return res.status(404).json({ message: 'One or both users not found' });
        }

        const newFriendship = new Friendship({ user1: user1Id, user2: user2Id, status });
        await newFriendship.save();

        res.status(201).json(newFriendship);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// This only fetches the friendship by the friendship table ID, NOT THE USER
app.get('/friendships/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const friendship = await Friendship.findById(id);
        if (!friendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }
        res.json(friendship);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get friendships by user ID <- this one gets them by the user ID
app.get('/friendships/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const friendships = await Friendship.find({
            $or: [{ user1: userId }, { user2: userId }],
        }).populate('user1 user2', 'username email'); // Optionally populate user details

        res.json(friendships);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/friendships/:id/update-status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const friendship = await Friendship.findById(id);
        if (!friendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }

        friendship.status = status;
        await friendship.save();

        res.json(friendship);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/friendships/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFriendship = await Friendship.findByIdAndDelete(id);
        if (!deletedFriendship) {
            return res.status(404).json({ message: 'Friendship not found' });
        }
        res.json({ message: 'Friendship deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// Routes for EVENT model
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/events', async (req, res) => {
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        address: req.body.address,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        owner: req.body.owner,
        group: req.body.group,
        visibility: req.body.visibility,
        eventType: req.body.eventType,
        coordinates: req.body.coordinates
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.put('/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Start the server
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, '0.0.0.0', () => {
    console.log(`Running on http://0.0.0.0:${port}`);
});



// Validation, middleware, error handling middleware etc.

// Helper functions and other server-side operations