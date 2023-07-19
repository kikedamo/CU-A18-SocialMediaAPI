const router = require('express').Router();
const User = require('./user')
const Thought = require('./thought')

router.use("/users", User);
router.use("/thoughts", Thought);

module.exports = router;