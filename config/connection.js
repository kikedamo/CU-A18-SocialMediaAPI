const {connection, connect} = require('mongoose');
connect(process.env.MONGODB_URI||"mongodb://localhost:27017/socialNetwork",{
    UseNewUrlParser: true,
    UseUnifiedTopology: true
});

module.exports = connection;