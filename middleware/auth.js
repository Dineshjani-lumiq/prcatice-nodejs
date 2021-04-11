
const jwt=require("jsonwebtoken");
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const auth=async(req,res,next)=>{
    console.log("middleware called");
    try{
const token=req.headers['authorization'];
console.log(token);
if(!token){
    res.json({status:'You do not send token so you are not allowed for secret information'});
}
else{
    console.log("verify token");
    
      tokenslice = token.slice(7);
     jwt.verify(tokenslice, JWT_SECRET, (err, decoded) => {
if(err){
               res.json({ status: 'you are not allowed to next route or secret infomation because your token is not valid' });

}
else{
console.log("you are allowed to secret infomation because you token is valid");
next();
}
     })
}
  
    }catch(error){
res.status(401).send(error);
    }
}
module.exports=auth;