const router = require('express').Router();

const{
    GetUsers, GetOneUser, CreateUser, UpdateUser, DeleteUser, AddFriend, DeleteFriend
} = require("../../controllers/UserController");
router.route("/").get(GetUsers).post(CreateUser)
router.route("/:id").get(GetOneUser).put(UpdateUser).delete(DeleteUser);
router.route("/:UserId/Friends/:FriendId").post(AddFriend).delete(DeleteFriend);

module.exports = router;