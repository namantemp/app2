import express from'express';
let router = express.Router();
import user from'../model/newsschema';

router.post('/',(req, res, next)=> {
  console.log(req.body);
  let author = req.body.author;
  let title = req.body.title;
  let description = req.body.description;
  let urlToImage=req.body.urlToImage;

   user.insertMany(req.body,(err,user)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("Post Method");
  console.log({user});
      res.json({user});
    }
  })
});
export default router;