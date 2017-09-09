import express from'express';
let router = express.Router();
import user from'../model/newsschema';

router.put('/',(req, res)=> {
  console.log(req.body.title);
  user.update({"_id": req.body._id},{$set:{
   "title": req.body.title}},{upsert:true},(err,user)=> {
    if(err){
      console.log(err);
    }
    else{
      console.log("Modified");
      console.log(user);
      res.json({user:user});
    }
  })
});

export default router;