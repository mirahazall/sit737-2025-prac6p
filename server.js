/**
Simple Node.js + Express Server
 * 
 * This server serves an `index.html` file that simply displays a text when users visit the root URL http://localhost:3000.
 * The `express.static()` middleware is used to serve the static files inside the `public` folder such as `index.html`.
 * 
 */

var express = require('express'); // Import the express module
const winston = require('winston'); // Import winston for logging

// Configure the logger
const logger = winston.createLogger({
    level: 'info', // Set log level to 'info'
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
    new winston.transports.Console({
    format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level:
    'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }), // Log to a file
    ],
    });

var app = express(); // Initialize Express application
var port = 3000; // Define the port for the server

app.use(express.static('public')); //Middleware to serve static files inside the `public` directory such as `index.html`
app.use(express.json()); // Middleware to parse JSON requests

// Function to validate numbers. It checks if both entered values are numbers.
function validateNumbers(number1, number2){
    if(typeof number1 !== "number" || typeof number2 !== "number"){
        return res.status(400).json({error: "num1 and num2 must be numbers"});
    }
    return null;
}

// Addition operation endpoint
app.post("/add", (req, res) => {
    const {number1, number2} = req.body;
    const error = validateNumbers(number1, number2);
    if(error){
        logger.log({
            level: 'error',
            message: `Error in addition operation: ${error}`
            });
        return res.status(400).json({error});
    }else{
        const result = number1 + number1;
        logger.log({
            level: 'info',
            message: `New add operation requested: ${number1} + ${number2} = ${result}`
            });
        res.json({result});
    }
});

//Subtraction operation endpoint
app.post("/subtract", (req, res) => {
    const {number1, number2} = req.body;
    const error = validateNumbers(number1, number2);
    if(error){
        logger.log({
            level: 'error',
            message: `Error in subtraction operation: ${error}`
        })
        return res.status(400).json({error});
    }else{
        const result = number1 - number2;
        logger.log({
            level: 'info',
            message: `New subtract operation requested: ${number1} - ${number2} = ${result}`
        })
        return res.json({result});
    }
})

//Division operation endpoint
app.post("/divide", (req, res) => {
    const {number1, number2} = req.body;
    const error = validateNumbers(number1, number2);
    if(error){
        logger.log({
            level: "error",
            message: `Error in division operation: ${error}`
        })
        return res.status(400).json({error});
    }else if(number2 === 0){
    res.status(400).json({error:"It's not possible to divide by 0"});
    }else{
        const result = number1/number2;
        logger.log({
            level: 'info',
            message: `New divide operation requested: ${number1} / ${number2} = ${result}`
        })
        return res.json({result});
    }
    
});

//Multiplication operation endpoint
app.post("/multiply", (req, res) => {
    const {number1, number2} = req.body;
    const error = validateNumbers(number1, number2);
    if(error){
        logger.log({
            level: 'error',
            message: `Error in multiply operation: ${error}`
        })
        res.status(400).json({error});
    }else{
        const result = number1 * number2;
        logger.log({
            level: 'info',
            message: `New multiply operation requested: ${number1} * ${number2} = ${result}`
        })
        res.json({result});
    }
});

// Starts the server and listen on the specified port
app.listen(port, () => {
console.log(`Server is running on port ${port}`)
});

