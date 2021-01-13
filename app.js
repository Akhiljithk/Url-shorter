const express=require('express');
const app=express();
const db=require('./config/dbConnect')
const bodyParser=require('body-parser')
const URLS=require('./models/urls');
const expressEjsLayout=require('express-ejs-layouts');

const port = 5000;

//connect to databse
db.connect();

//view engine 
app.set('view engine','ejs'); // view engine set as ejs 
app.use(expressEjsLayout); // using that ejs lib (not sure)
app.use(express.static('public/')); //setting public folder for assign css js img folders

//parsing the data 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());// coming data form post method will converted to json format using body-parser lib from express

//api
//get post put delete patch are
app.get('/', (req,res)=>{
    res.render('index', {host:req.get('host')})
})

app.post('/',async(req,res)=>{
    console.log('form data : ',req.body.name);
    const {redirectedUrl,name}=req.body;
    
    if(redirectedUrl === '' || name === ''){
        return res.render('index', {host:req.get('host'), error:"Please fill in all fields"});
    }

    const url=await URLS.find({name:name}); // fidning the same data form database (urls.js file) to check for the given data is already exist or not
    
    if(url.length === 1){
        return res.render('index',{host:req.get('host'),error:"This url alredy exist"})
    }else{
        const fullUrl= "http://"+req.get('host')+'/'+name;
        
        const newUrl=new URLS({
            redirectedUrl,
            name,
            fullUrl,
        });
        
        newUrl.save().then((response)=>{
            res.render('index',{host:req.get('host'),success:fullUrl}).catch((err)=>{
                console.log(err);
            })
        })
    }
});

app.get('/:name',async(req,res)=>{
    const { name } = req.params;

    const data = await URLS.find({name})

    if(data.length < 1){
        return res.status(404).json({errot:true,msg:"Error 404: this url not found"})
    }else{
        res.redirect(data[0].redirectedUrl)
        // console.log(data[0].redirectedUrl);
    }


})


app.listen(port,()=>{
    console.log('Server is running on port', port)
})