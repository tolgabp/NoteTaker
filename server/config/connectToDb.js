const mongoose = require('mongoose');
//set the flag to false to override the current strictQuery behaviour and prepare for the new release
mongoose.set("strictQuery", false);


async function connectToDb(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to database");
        
    } catch(err){
        console.log(err);
    }
    
}

module.exports = connectToDb;