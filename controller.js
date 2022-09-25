const mongoose=require('mongoose')
const Interview=require('./interview');



const overlap= (st,en,date,inv)=>{
    for(let i=0 ; i<inv.length ; i++){
        if(inv[i]['date']===date && (st<=inv[i]['en'] && en>=inv[i]['st'])){
            return true;
        }
    }
   
    return false;
}
exports.addInterview= async (req,res)=>{
    try{

        const {iname,name,date,st,en,users}=req.body;
        const inv=await Interview.find({});
        if(iname==='' || name==='' || st==='' || en==='' || date==='')
            return res.status(400).json({ok:false,err:"All feilds are required"});
        if(st>=en)
            return res.status(400).json({ok:false,err:"Start time should be less than end time"});
    
        let f=overlap(st,en,date,inv);
        
        if(f)
            return res.status(400).json({ok:false,err:"Already interview is sheduled"});
        
        const _inv=new Interview({iname,name,date,st,en,users});
        _inv.save((err,data)=>{
            if(err){
                console.log(err.message);
                return res.status(400).json({ok:false,err:"Something went wrong"});
            }
            return res.status(200).json({ok:true,data});
        })
    }catch(e){
        return res.status(400).json({ok:false,err:"something went wrong"});
    }
};

exports.getInterviews=async (req,res)=>{
    try{
        const inv=await Interview.find({});
        return res.status(200).json({ok:true,inv});
    }catch(e){
        return res.status(400).json({ok:false,err:"something went wrong"});
    }
}

exports.updateInterview=async(req,res)=>{
    try{

        const {iname,date,name,st,en,id}=req.body;
        // console.log(iname,name,st,en,date,id);
        if(iname==='' || name==='' || st==='' || en==='' || date==='')
            return res.status(400).json({ok:false,err:"All feilds are required"});
        if(st>=en)
            return res.status(400).json({ok:false,err:"Start time should be less than end time"});
        const inv=await Interview.find({});
        let f=overlap(st,en,date,inv);
        
        if(f)
            return res.status(400).json({ok:false,err:"Already interview is sheduled"});
        const key= mongoose.Types.ObjectId(id);
        const doc=await Interview.findById(key);
        
        doc.iname=iname;
        doc.date=date;
        doc.name=name;
        doc.st=st;
        doc.en=en;

        doc.save(async (err,data)=>{
            if(err){
                console.log(err.message)
                return res.status(400).json({ok:false,err:"something went wrong"});
            }
            const up=await Interview.find({});
            return res.status(200).json({ok:true,up});
        })
    }catch(e){
        console.log(e.message)
        return res.status(400).json({ok:false,err:"something went wrong"});
    }
}