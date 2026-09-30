const express=require('express')
const app=express();
const env=require('dotenv');
const connect=require('./Config/Config');
env.config();
connect();
app.use(express.json());
app.use('/api',require('./Router/Router'));

app.listen(process.env.PORT,()=>{
    console.log('server is running on port ' + process.env.PORT)
});
module.exports=app;
