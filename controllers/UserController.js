require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for user signup
signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }


    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)||  password.length <= 7) {
      return res.status(400).json(user._id);
    }
  

    console.log('HASH')
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);



    // Create a new user instance
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    res.body = await newUser.save(); 
    console.log(res.body)   
    res.status(201).json(res.body);
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
};

// Controller for user login
login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });



    // Check if the user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Replace with your own secret key
      { expiresIn: '1h' } // Set token expiration time as desired
    );

    // Handle successful login
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login' });
  }
};


module.exports= {signup,login}