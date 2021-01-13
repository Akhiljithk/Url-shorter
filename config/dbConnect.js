const mongoose=require('mongoose')
const { mongoURI }=require('./key') 

module.exports.connect=()=>{
    mongoose.connect(mongoURI,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true }, (err)=>{
        if(err){
            console.log('err'+err)
        }else{
            console.log('Database is connected')
        }
    })
}; 