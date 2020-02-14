const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// funkcija jer ce se pozvat u server.js
const connectDB = async () => {
    try {
        //use... tribalo ubacit radi nekih depricated funkcija
        await mongoose.connect(db, {
           useNewUrlParser: true,
           useCreateIndex: true,
           useUnifiedTopology: true
        });

        console.log('MongoDB Connected')
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;