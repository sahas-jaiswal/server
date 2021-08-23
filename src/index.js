const express = require('express');
const env = require('dotenv');
const app = express()
env.config();
const cors = require("cors");
const port = process.env.PORT || 5000;

//importing routes
const adminRoutes = require("./routes/auth.admin");
const categoryRoutes = require("./routes/auth.category");
const articleRoutes = require("./routes/auth.article");


//synchronising database
const db = require("./models");
db.sequelize.sync().then((res,err) => {
    if(res)
    {
        console.log('Connected to database.')
    }else{
        console.log(err);
    }
});

// define root route
app.use(cors());
app.use(express.json());
app.get('/', (req, res)=>{res.json('Welcome to the server');});
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', articleRoutes);


// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
});