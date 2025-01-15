const express=require('express');
const {handlegeneratenewshorturl ,  handlegetanalytics}= require("../controllers/url");
const router=express.Router();

router.post('/',handlegeneratenewshorturl);

router.get('/analytics/:short_id',handlegetanalytics);

module.exports=router;