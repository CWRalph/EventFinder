// import express from 'express';
// import cors from 'cors';

const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * Some dummy events for testing the get events endpoint
 */

const events = [
    {
        eventId: 1,
        name: 'Birthday Party',
        owner: {userId: 1, username: 'john_doe', email: 'john@example.com'},
        date: new Date('2024-04-15'),
        address: '123 Main St, Anytown, USA',
        eventType: 'Birthday',
        coordinates: {x: 40.7128, y: -74.0060},
        visibility: 'Public',
        description: 'Celebrating John\'s 30th birthday!',
        locationName: 'John\'s House',
        participants: [
            {userId: 2, username: 'jane_doe', email: 'jane@example.com'}
        ]
    },
    {
        eventId: 2,
        name: 'Tech Conference',
        owner: {userId: 3, username: 'alice_smith', email: 'alice@example.com'},
        date: new Date('2024-05-20'),
        address: '456 Tech Ave, Silicon Valley, USA',
        eventType: 'Conference',
        coordinates: {x: 37.7749, y: -122.4194},
        visibility: 'Private',
        description: 'Annual tech conference focusing on innovation.',
        locationName: 'Tech Convention Center',
        participants: [
            {userId: 4, username: 'bob_jones', email: 'bob@example.com'}
        ]
    }
];

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/events', (req, res) => {
    res.json(events);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



