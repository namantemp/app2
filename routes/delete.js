import express from'express';
let router = express.Router();
import user from'../model/newsschema';

router.delete('/:title',(req, res, next)=> {
  console.log(req.params)
  user.remove({title: req.params.title  },
   (err,user)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("Deleted");
      res.json({user});
    }
  })
});
export default router;