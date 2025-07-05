const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const host = process.env.MONGO_HOST;
        const port = process.env.MONGO_PORT;
        const dbName = process.env.MONGO_DBNAME;
        const uri = `mongodb://${host}:${port}/${dbName}`;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

const connectDBAtlas = async () => {
    const connectionString = process.env.MONGO_ATLAS_URI;

    mongoose.connect(connectionString)
        .then(() => {
            console.log('Connected to MongoDB successfully!');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}

module.exports = connectDB;
module.exports = connectDBAtlas;