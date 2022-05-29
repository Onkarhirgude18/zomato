const express = require('express');
const routes = require("./Routes/index");
const mongoose = require('mongoose');
const app = express();

const port = 5555;

app.use('/', routes);

mongoose.connect('mongodb+srv://newuser:Vz3AQsDwEfi8xe09@cluster0.y495r.mongodb.net/zomato?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((success)=>{
  console.log('connected')

  app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
 });
}).catch((err)=>{
   console.log('error connecting to mongoDB') 
});

/*
mongodb+srv://newuser:m0DldPSxYAgsTQvK@cluster0.y495r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/