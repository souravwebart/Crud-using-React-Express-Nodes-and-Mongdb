const mongoose = require('mongoose');



const DB = "mongodb+srv://crud:crud@cluster0.46sdc.mongodb.net/MyCrud?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection start');
}).catch((error) => {
    console.log(error.message);
})
