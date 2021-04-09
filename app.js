const express=require('express');
const app=express();

const routerpath=require('./routes/routes')
app.use('/',routerpath)

app.listen(3008,()=>{
    console.log("server started");
})
