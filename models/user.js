const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    Username:{
        type: String,
        required: true,
        unique:true,
        trim:true,
    },
    Email:{
        type: String,
        required: true,
        unique:true,
        trim:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
    },
    Friends:[{
        type:Schema.Types.ObjectId,
        ref: "User",
    }],
    Thoughts:[{
        type:Schema.Types.ObjectId,
        ref: "Thoughts",
    }]
},{
    toJSON:{
        virtuals:true,
        Getters:true,
    },
    id:false,
});

const User = model('User', UserSchema);
UserSchema.virtual("FriendCounts").get(function(){
    return this.Friends.length
});

module.exports = User;