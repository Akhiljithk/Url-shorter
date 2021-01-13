const mongoose=require('mongoose');
const Schema=mongoose.Schema; //Scheme is just structure of Mongodb database

const urlSchema=new Schema(
    {
        redirectedUrl:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        fullUrl:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true,// dont understand line
    }
); // made a class having schema structure, also we have to make object inside that


module.exports=mongoose.model('urls',urlSchema);// class name is urls and model of that class is urlSchema