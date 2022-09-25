const express=require('express');
const {addInterview,getInterviews,updateInterview}=require('./controller');

const router=express.Router();

router.post('/addInterview',addInterview);
router.get('/getInterviews',getInterviews);
router.post('/updateInterview',updateInterview);


module.exports=router;