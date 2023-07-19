const {Thought, User} = require('../models');

const ThoughtController = {
    GetAllThoughts(req,res){
        Thought.find({})
        .then(ThoughtData=>
            res.json(ThoughtData)
        )
        .catch(err=>{
            res.status(400).json(err);
        })
    },
    GetOneThought(req,res){
        Thought.findOne({_id: req.params.ThoughtId})
        .select('-_v')
        .then((Thought)=>
            !Thought
            ?res.status(400).json({Message:'There is 0 thought with that Id.'})
            :res.json(Thought)
        )
        .catch(err=>{
            res.status(400).json(err);
        })
    },
    CreateThought({params,body}, res){
        Thought.create(body)
        .then(({_id})=>{
            return User.findOneAndUpdate({
                Username: body.Username
            },
            {
                $push:
                {
                    Thoughts:_id
                }
            },
            {
                new:true
            });
        })
        .then(UserData =>{
            if (!UserData){
                res.status(404).json({Message:`There's No User with id:${body.Username}`})
                return;
            }
            res.json(UserData);
        })
        .catch (err => res.json(err))
    },
    UpdateThought({params,body}, res){
        Thought.findOneAndUpdate(
            {id:params._id},
            body,
            {
                new:true,
                runValidators: true
            }   
        )
        .then(UpdatedThought =>{
            if (!UpdatedThought){
                res.status(404).json({Message:`There's No Thought Found with id:${params.id}`})
                return;
            }
            res.json(UpdatedThought);
        })
        .catch (err => res.json(err))
    },
    DeleteThought({params,body}, res){
        Thought.findOneAndDelete({id:params._id})
        .then(DeletedThought =>{
            if (!DeletedThought){
                res.status(404).json({Message:`There's No Thought Matching with id:${params.id}`})
                return;
            };
            res.json(DeletedThought);
        })
        .catch (err => res.json(err));
    },
    CreateReaction({params,body}, res){
        Thought.findOneAndUpdate(
            {_id:params.ThoughtId},
            {$push:{reactions:body}},
            {
                new:true,
                runValidators: true
            }
        )
        .then(ThoughtData =>{
            if (!ThoughtData){
                res.status(404).json({Message:`There's No Thought Found Matching with id:${params.ThoughtId}`})
                return;
            };
            res.json(ThoughtData);
        })
        .catch (err => res.json(err));
    },
    DeleteReaction({params,body}, res){
        Thought.findOneAndUpdate(
            {id:params.ThoughtId},
            {$pull:{reactions:{ReactionId:params.ReactionId}}},
            {new:true},
        )
        .then (ThoughtData => res.json(ThoughtData))
        .catch (err => res.json(err));
    }
};

module.exports = ThoughtController;
