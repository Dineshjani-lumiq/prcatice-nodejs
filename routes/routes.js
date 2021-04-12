const express =require('express');
const app =express();
const router=express.Router();
var cors = require('cors')
const mongoose = require('mongoose')
const User = require('../models/user')
const tokenmodel = require('../models/refreshtoken');

const bcrypt = require('bcrypt')
const passport=require('passport');
const auth=require('../middleware/auth');
const auth1=require('../middleware/auth1');

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';
const refesh_SECRET = 'thisismyrefreshsecret';

mongoose.connect('mongodb://localhost:27017/signin-signup', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});
app.use(cors())
router.get('/callback',(req,res)=>{
console.log("callback hell");

function add(val,callback){
    return callback(val+5,false);
}
function minus(val,callback){
    return callback(val-3,false);
}
function multiply(val,callback){
    return callback(val*2,false);
}
add(4,function(res,err){
    if(!err){
        minus(res,function(res1,err){
if(!err){
    multiply(res1,function(res2,err){
        if(!err){
            console.log(res2);
        }
    })
}
        })
    }
})

})







router.get('/promise',(req,res)=>{
console.log("promise called");

function add(val){
    return (val+5);
}
function minus(val){
    return (val-3);
}
function multiply(val){
    return (val*2);
}
var promise=new Promise(function(resolve,reject){
    resolve(4);
})
promise.then(add).then(minus).then(multiply).then(function(res){
    console.log(res);
}).catch(function(err){
    console.log(err);
})


})










router.get('/async',(req,res)=>{
    console.log("async await called");
    
    function add(val){
        return (val+5);
    }
    function minus(val){
        return (val-3);
    }
    function multiply(val){
        return (val*2);
    }
    async function name(val){
        try{
        const val1= await add(val);
        const val2= await minus(val1);
        const val3= await multiply(val2);
    console.log(val3);}
        catch(err){
            console.log(err);
        }
        
    }
    name(5);
    
    
    })












router.get('/async-promise',(req,res)=>{
    console.log("async promise called");
    
    function add(val){
        return (val+5);
    }
    function minus(val){
        return (val-3);
    }
    function multiply(val){
        return (val*2);
    }
    function and(val){
        return (val&5);
    }
    function or(val){
        return (val|3);
    }
    function xor(val){
        return (val^2);
    }
    async function airthmatic(val){
        try{
        const val1= await add(val);
        const val2= await minus(val1);
        const val3= await multiply(val2);
    return (val3);}
        catch(err){
            console.log(err);
        }
        
    }
    async function logical(val){
        try{
        const val1= await and(val);
        const val2= await or(val1);
        const val3= await xor(val2);
    return (val3);}
        catch(err){
            console.log(err);
        }
        
    }
    /*
    (async () => {
  const calairthmatic = airthmatic(4)
  const callogical = logical(4)
  await calairthmatic
  await callogical
  console.log(calairthmatic);
    console.log(callogical);

  var res1,res2;
  calairthmatic.then(function(res){

      res1=res;
      console.log(res1);
  })
   callogical.then(function(res){
      res2=res;
      console.log(res2);
  })
  /*console.log(res2-res1);*/
  /*
  Promise.all([calairthmatic,callogical]).then(values => {
  console.log(values[0]-values[1]); 
});
})()



    */
    Promise.all([airthmatic(4),logical(4)]).then(values => {
        
  console.log(values[0]-values[1]); 
});
    })


router.post('/api/login', async (req, res) => {
    console.log(req.query);
	const username = req.query.username;
    const password=req.query.plainTextPassword;
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {
		// the username, password combination is successful

		const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET,
            {
                    expiresIn: 60 // expires in 1 minute
                }
		)
        const refreshtoken=jwt.sign(
			{
				id: user._id,
				username: user.username
    
			},
			refesh_SECRET,
            {
                    expiresIn: '60y' // expires in 1 minute
                }
		)
await tokenmodel.create({
			token:refreshtoken
		})
		return res.json({ status: 'ok', accesstoken: token,refreshtoken:refreshtoken })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})

router.post('/api/register', async (req, res) => {
    console.log("in register process");
    console.log(req.query);
	const username = req.query.username;
    const plainTextPassword=req.query.plainTextPassword;
    

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
    

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

router.get('/secret',auth,(req,res)=>{
    
res.json({ status: 'Secret INformatin' });
})


router.post('/refresh',(req,res)=>{
    var token=req.headers['authorization'];
console.log(token);
if(!token){
    res.json({status:'You do not send token so you are not allowed for secret information'});
}
let tokenslice;
    
  console.log("verify token");
    
      tokenslice =  token.slice(7);                                                              
     
      let refreshntoken;
      tokenmodel.findOne({ token: tokenslice },function(err,ans){
          if(err){
  res.json({status:'refreshtoken is not persent in database'});
          }
          else{
              console.log("ram");
              console.log(ans);
              
          }
      });
     
            
    let userId;
   jwt.verify(tokenslice, refesh_SECRET, (err, decoded) => {
if(err){
               res.json({ status: 'your token is not valid' });

}
else{
    
    console.log(decoded);
    userid=decoded.id;
     User.findOne({ _id: userid },function(err,user){
if(err){
    res.json({status:'token valid but user not found'});
}
console.log(user);
const token = jwt.sign(
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET,
            {
                    expiresIn: 60 // expires in 1 minute
                }
		)
        const refreshtoken=jwt.sign(
			{
				id: user._id,
				username: user.username
    
			},
			refesh_SECRET,
            {
                    expiresIn: '60y' // expires in 1 minute
                }
		)
        // database whitelist
            tokenmodel.create({ token: refreshtoken });
            res.json({ token, refreshtoken });



    
    
    

    

     })
    

}
     })
          
                
    
})


router.post('/logout',auth1,(req,res)=>{
    var token=req.headers['authorization'];

          tokenslice =  token.slice(7);                                                              

    tokenmodel.deleteOne({ token: tokenslice },function(err,ans){
        if(err){
            res.json({
                status:'error in loogout'
            })

        }
        else{
            res.json({
                status:'refreshtoken deleted succesfully',
                refreshntoken:tokenslice

            })
        }
    })
        
})


module.exports=router
