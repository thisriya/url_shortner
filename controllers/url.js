const short_id =require("shortid");
const URL=require("../models/url");
async function handlegeneratenewshorturl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"});
    const shortid= short_id(8);
    await URL.create({
       shortid:shortid,
       redirecturl:body.url,
       visithistory:[],
    });
    return res.render("home",{
        id:shortid,
    })
}


async function handlegetanalytics(req,res){
  const shortid=req.params.short_id;
  const result=await URL.findOne({shortid});
  return res.json({
    totalclicks: result.visithistory.length,
    analytics: result.visithistory,
});
}
module.exports={
    handlegeneratenewshorturl,
    handlegetanalytics,
}