const express =require('express');
const app =express();
const router=express.Router();
var cors = require('cors')

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
        console.log(values);
  console.log(values[0]-values[1]); 
});
    })





module.exports=router
