import mongoose from "mongoose";

//create schema or structure

var UserSchema=mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

//create model {collection/table}
var Users =mongoose.model("Users",UserSchema);
export default Users;