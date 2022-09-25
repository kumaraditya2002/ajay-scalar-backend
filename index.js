const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const env=require('dotenv');
const cors=require('cors');

const app=express();
env.config();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    process.env.URI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    ).then(()=>{
        console.log(`Database connection established`);
    }).catch(err=>console.log(err));


const interviewRoutes=require('./routes');

app.use('/',interviewRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port:${process.env.PORT}`);
});
