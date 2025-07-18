require('dotenv').config();
const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors')
const morgan = require('morgan');

const port = process.env.PORT || 5000

const app = express()
app.use(morgan('tiny')); // Log HTTP requests in "tiny" format
app.use(express.json())

// Configure CORS with more specific options
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token']
}));

// Add security headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token');
    next();
});

// Available Routes
app.get('/', (req, res) => {
    res.json({ message: "Notekar API is running" })
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(port, () => {
    console.log(`Notekar backend listening on port http://localhost:${port}`)
}) 