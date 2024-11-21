const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../Models/User')

exports.SignUp = async(req,res)=>{

    try {
        const {name, email, password} = req.body
        const found = await  User.findOne({email})

        if (found){
            return res.status(400).send({errors : [{msg: 'email already exists'}]})
        }
        const newAccount = new User(req.body)


        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        newAccount.password = hashedPassword

        newAccount.save()

        const payload = {id : newAccount._id}

        var token = jwt.sign(payload, process.env.privateKey);

        res.status(200).send({msg : "account created" , newAccount , token})




    } catch (error) {
        res.status(500).send({errors : [{msg : 'could not create account'}]})
    }

}


exports.SignIn = async(req,res)=>{

    try {

        const {name,email,password} = req.body
        const found = await User.findOne({email})
        if(!found){
            return res.status(400).send({errors : [{msg : "wrong email or password"}]})
        }
        
        const matched = bcrypt.compareSync(password, found.password); 

        if(!matched){
            return res.status(400).send({errors : [{msg : "wrong email password"}]})
        }

        const payload = {id : found._id}

        var token = jwt.sign(payload, process.env.privateKey);

        res.status(200).send({msg : "welcome" , found, token})



    } catch (error) {
        res.status(500).send({errors : [{msg :'could not login'}]})
    }

}