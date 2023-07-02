
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOSTR, {
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to mongooseDB'))
.catch((err) => console.error('MongoDB Connnetion Error',err));

app.post('/api/register', async (req,res) => {
    const {name,email,password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        res.json({status:'error', message:'Duplicate Email'});
    } else {
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();
        res.json({status:'success',message:'Registration successfull',user:{newUser}});
    }
});

app.post('/api/login', async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        const isMatched = await bcrypt.compare(password,user.password);
        if(isMatched) {
            const token = jwt.sign({name: user.name, email: user.email}, process.env.JWTPASS);
            res.json({status:'success',message:'Login successfull',user:token});
        } else {
            res.json({status:'error', message:'Invalid Password', user:false});
        }
    } else {
        res.json({status:'error', message:'Invalid Email', user:false});
    }
});

app.get('/api/profile', async (req,res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token,process.env.JWTPASS);
        const email = decoded.email;
        const user = await User.findOne({email:email});
        res.json({status:'success', user:user});
    } catch (error) {
        res.json({status:'error', message:'Invadid Token'});
    }
});

// app.post('/api/profile', async (req,res) => {
//     const token = req.headers['x-access-token'];
//     try {
//         const decoded = jwt.verify(token,process.env.JWTPASS);
//         const email = decoded.email;
//         const user = await User.updateOne({email:email});
//         res.json({status:'success', user:true});
//     } catch (error) {
//         res.json({status:'error', message:'Invadid Token'});
//     }
// });

app.listen(process.env.PORT || 6020);