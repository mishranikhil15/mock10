const mongoose=require('mongoose');


// - Username
// - Email
// - Password

const UserSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String
})

const UserModel=mongoose.model("users",UserSchema);


module.exports={
    UserModel
}