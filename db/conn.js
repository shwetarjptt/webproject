const mongoose = require('mongoose');

const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log(`connection succesful`);
}).catch((err) => console.log(`no connection`));