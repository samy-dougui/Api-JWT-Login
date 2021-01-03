const router = require('Express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registerValidation, logInValidation} = require('../validation');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {

    // Let's validate the user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create a new user
    const user = new User({
        name:req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send({user : user._id});
    }catch(err){
        res.status(400).send(err);
    };
});


//log in
router.post('/login', async (req, res) => {
    // Let's validate the user
    const {error} = logInValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email doesn't exist");

    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid Password");

    //Create and asign a token
    const token = jwt.sign({_id : user._id},process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);


    //res.send('Logged in');
})


module.exports = router; 