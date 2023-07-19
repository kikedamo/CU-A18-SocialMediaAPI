const router = require('express').Router();

const{
    GetAllThoughts, GetOneThought, CreateThought, UpdateThought, DeleteThought, CreateReaction, DeleteReaction
} = require("../../controllers/thoughtController");

router.route("/").get(GetAllThoughts).post(CreateThought)
router.route("/:id").get(GetOneThought).put(UpdateThought).delete(DeleteThought);
router.route("/:ThoughtId/Reactions").post(CreateReaction)
router.route("/ThoughtId/ReactionId").delete(DeleteReaction)

module.exports = router;