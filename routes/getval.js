import express from'express';
let router = express.Router();
import user from'../model/newsschema';

router.get('/',(req, res, next)=> {
  user.find((err,user)=>{
    if(err){
      console.log(err);
      res.send(err);
    }
    else{
      console.log("Get Method");
      res.json({user:user});
    }
  })
});

export default router;