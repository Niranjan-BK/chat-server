const mongoose = require('mongoose')
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
})
