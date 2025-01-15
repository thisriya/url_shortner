const express=require('express');
const{connecttomongo}=require("./connect");
const urlroute=require("./routes/url");
const URL=require("./models/url");
const path=require("path");
const staticrouter=require("./routes/staticrouter");

const app=express();
const PORT=8001;

connecttomongo('mongodb://localhost:27017/shorturl').then(()=> console.log("Database connected!"));

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url",urlroute);
app.use("/",staticrouter);

// app.get("/test",async (req,res)=>{
//     const allurls=await URL.find({});
//     return res.render("home", {
//         urls:allurls, 
//     });
// }); 


app.use("//:short_id",async(req,res)=>{
    const short_id=req.params.short_id;
    const entry=await URL.findOneAndUpdate(
         {shortid:short_id}, {$push:{visithistory:{
        timestamp:Date.now(),
    },

    },
}
);
res.redirect(entry.redirecturl);
});

app.listen(PORT,()=> console.log(`Server Started! at PORT:${PORT}`));