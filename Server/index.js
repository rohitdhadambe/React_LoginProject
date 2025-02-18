const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./models/Employee');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    // {
    //     origin: function (origin, callback) {
    //         // Define the list of allowed origins
    //         const allowedOrigins = [' http://localhost:5173/'];
        
    //         // Allow requests with no origin (like mobile apps or curl requests)
    //         if (!origin) return callback(null, true);
        
    //         if (allowedOrigins.includes(origin)) {
    //           // If the origin is in the allowed list, allow the request
    //           callback(null, true);
    //         } else {
    //           // Otherwise, deny the request
    //           callback(new Error('Not allowed by CORS'));
    //         }
    //       },
    //       methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    //       credentials: true, // Allow cookies or other credentials in cross-domain requests
    // }
));

//mongoose.connect("mongodb://localhost:27017/Employee")  //local connection
mongoose.connect("mongodb+srv://rohitdhadambe:Rohit%40%23%24123@cluster0.fjstk.mongodb.net/EmployeeDB?retryWrites=true&w=majority")   //Atlas connection

.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("MongoDB connection failed:", error));

    app.post('/login', (req, res) => {
        const {email, password} = req.body;
        Employee.findOne({email : email})
        .then(user =>{
            if(user){
                if(user.password === password){
                    res.json("SUCCESS")
                }else{
                    res.json("PASSWORD IS WRONG")
                }
            }else{
                res.json("NO RECORD EXIST")
            }
        })

    });
  


// POST route for registering an employee
app.post('/register', (req, res) => {
    Employee.create(req.body)
        .then(employee => res.status(201).json(employee))
        .catch(error => res.status(400).json({ error: error.message }));
});

app.listen(3001, () => {
    console.log("Server is running on port ");
});
