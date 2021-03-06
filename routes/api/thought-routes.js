const router = require("express").Router();
const {
	getAllThought,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
	addReaction,
	deleteReaction,
} = require("../../controllers/thought-controller");

// Set up GET all at /api/thoughts
router.route("/").get(getAllThought);

// Set up POST route to include associated user id
router.route("/:userId").post(createThought);

// Set up GET one and PUT at /api/thoughts/:id
router.route("/:thoughtId").get(getThoughtById).put(updateThought);

// Set up DELETE
router.route("/:userId/:thoughtId").delete(deleteThought);

// Set up adding a reaction at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// set up Deleting a reaction by id
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
