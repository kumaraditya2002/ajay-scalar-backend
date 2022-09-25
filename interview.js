const mongoose=require('mongoose');

const InterviewSchema=new mongoose.Schema({
    iname:{
        type:String,
        trim:true,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    st:{
        type:String,
        required:true
    },
    en:{
        type:String,
        required:true
    },
    users:[
        {
            name:{
                type:String,
                required:true,
                trim:true
            },
            email:{
                type:String,
                required:true,
                trim:true
            }
        }
    ]
},{timeseries:true});

module.exports=mongoose.model('Interview',InterviewSchema);