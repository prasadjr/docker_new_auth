const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// In-memory user store (for simplicity)
let users = [];

app.use(cors());
app.use(express.json());

// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the user already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = { username, password };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully' });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Check if the user exists and passwords match
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

