const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require('../db/conn');
const User = require("../model/userSchema");
router.use(cookieParser());

router.get('/', (req, res) => {
    res.send(`hello index with routerjs`);
});


// promises
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword} =req.body;

//     if(!name || !email || !password || !work || !cpassword){
//         return res.status(422).json({ error: "plz filled the field property" });
//     }
//     User.findOne({ email: email })
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({ error: "email alerady Exist"});
//         }

//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({ message: "user registered successfully"});
//         }).catch((err) => res.status(500).json({ error: "failed to resgister"}));
//     }).catch(err => { console.log(err); });


// async-await
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword} =req.body;

    if(!name || !email || !password || !work || !cpassword){
        return res.status(422).json({ error: "plz filled the field property" });
    }
    try{
        const userExist= await User.findOne({ email: email });
        
            if(userExist){
                return res.status(422).json({ error: "email alerady Exist"});
            } else if (password!= cpassword){
                return res.status(422).json({ error: "password are not matched"});
            }else{
                const user = new User({name, email, phone, work, password, cpassword});

                await user.save();
         
                res.status(201).json({ message: "user registered successfully"});
            }
            
    } catch (err) {
        console.log(err);
    }    
})

router.post('/signin', async (req, res) => {
    try{
        let token;
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ error: "plz filled the data"})
        }

        const userlogin =  await User.findOne({ email: email });
        
        if(userlogin){
            const isMatch = await bcrypt.compare(password, userlogin.password);

            token = await userlogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({ error: "user error" });
            }else{
                res.json({ message: "user signin successfully"});
            }

        }else{
            res.status(400).json({ error: "Invalid Credientials" });
        }

    } catch (err) {
        console.log(err);
    }
})

//about page



router.get('/about', authenticate, (req, res) => {
    debugger;
        console.log(`hello my about middleware`);
        res.send(req.rootUser);
    });

    router.get('/getdata', authenticate, (req,res) => {
        console.log(`hello my getdata middleware`);
        res.send(req.rootUser);
    })
    // contact

    router.post('/contact', authenticate, async (req, res) => {
        debugger;
        try {
            const { name, email, phone, message } = req.body;

            if(!name || !email || !phone || !message){
                console.log('error in contact form');
                return res.json({ error: "plzz filled the contact form"});


            }

            const userContact = await User.findOne({ _id: req.userID });

            if(userContact){
                const userMessage = await userContact.addMessage(name, email, phone, message);
                await userContact.save();
                res.status(201).json({ message: "user contact successfully"});
            }
        }catch (err) {

        }
    })

    //logout

    router.get('/logout', (req, res) => {
        console.log(`hello my logout page`);
        res.clearCookie('jwtoken', {path:'/'})
        res.status(200).send('User Logout');
    })

module.exports = router;