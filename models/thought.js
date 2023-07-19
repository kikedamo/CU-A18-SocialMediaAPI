const moment=require('moment');
const {Schema, model, Types}=require('mongoose');

const ThoughtSchema = new Schema({
    ThoughtText:{
        type: String,
        required: true,
        MinLength: 1,
        MaxLength: 250,
    },
    CreatedAt:{
        type:Date,
        default:Date.now,
        get:(PostDate)=>{
            moment(PostDate).format('MMM DD, YYYY [at] hh:mm a');
        }
    },
    Username:{
        type: String,
        required: true,
        ref:"User",
    },
    Reactions:[ReactionSchema],
},{
    toJSON:{
        virtuals:true,
        Getters:true,
    },
    id:false,
});

const ReactionSchema = new Schema({
    ReactionId:{
        type:Schema.Types.ObjectId,
        default:() => new Types.ObjectId()
    },
    ReactionsBody:{
        type: String,
        required: true,
        MinLength: 1,
        MaxLength: 250,
        trim:true,
    },
    Username:{
        type: String,
        required: true,
    },
    CreatedAt:{
        type:Date,
        default:Date.now,
        get:(ReactionDate)=>{
            moment(ReactionDate).format('MMM DD, YYYY [at] hh:mm a');
        }
    },
},{
    toJSON:{
        Getters:true,
    },
    id:false,
});

const Thought = model('Thought', ThoughtSchema);
ThoughtSchema.virtual("ReactionsCounts").get(function(){
    return this.Reactions.length
});

model.exports = Thought;