const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        requied: true,
        validate: {
            validator: function(v){
                return v.length<20
            },
            message: "user name should be less than 20 characters"
        }
    },
    email:{
        type: String,
        unique:true,
        requied: true
    },
    password:{
        type: String,
        requied: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'partner'],
        required: true,
        default: 'user'
    },
    otp:String,
    otpExpirty: Date
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel
