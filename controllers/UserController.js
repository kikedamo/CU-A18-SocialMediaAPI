const {User, Thought} = require('../models');

const UserController = {
    GetUsers(req,res) {
        User.find()
        .then(async(Users) =>{
            const UserObj = {
                Users,
            };
            return res.json(UserObj)
        })
        .catch(err=>{
            res.status(400).json(err);
        })
    },
    GetOneUser(req,res){
        User.findOne({_id: req.params.id})
        .select('-_v')
        .then(async (User)=>
            !User
            ?res.status(404).json({Message:'There is 0 User with that Id.'})
            :res.json(User)
        )
        .catch(err=>{
            console.log(err)
            res.status(400).json(err);
        })
    },
    CreateUser(req,res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },
    UpdateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.UserId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((User) =>
        !User
        ?res.status(404).json({Message:'There is 0 User with that Id.'})
        :res.json(User)
        )
        .catch(err=>{
            console.log(err)
            res.status(400).json(err);
        })
    },
    DeleteUser(req,res){
        console.log(req.params.UserId, User)
        User.findOneAndDelete({_id: req.params.UserId})
        .then((User) =>
            !User
            ?res.status(404).json({Message:'There is 0 User with that Id.'})
            :Thought.deleteMany({_id:{$in: User.Thought}})
        )
        .then(() => res.json({Message:"User & User's Thoughts Have Been Deleted"}))
        .catch(err=>{res.status(400).json(err)});
    },
    AddFriend(req,res){
        console.log("You're In The Process Of Adding A Friend.");
        User.findOneAndUpdate(
            {_id: req.params.UserId},
            {$addToSet:{Friends: req.params.FriendId}},
            {runValidators: true, new:true,}
        )
        .then((User) =>
        !User
        ?res.status(404).json({ Message: 'There is no user with that ID.'})
        :res.json(User)
        )
        .catch(err=>{res.status(400).json(err)});
    },
    DeleteFriend(req,res){
        console.log("You're In The Process Of Deleting A Friend.");
        User.findOneAndUpdate(
            {_id: req.params.UserId},
            {$pull:{Friends: req.params.FriendId}},
            {runValidators: true, new:true,}
        )
        .then((User) =>
        !User
        ?res.status(404).json({ Message: 'There is no user with that ID.'})
        :res.json(User)
        )
        .catch(err=>{res.status(400).json(err)});
    },
}

module.exports = UserController;