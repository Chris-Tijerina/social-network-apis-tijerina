const { User, Thought } = require("../models");

const thoughtController = {
	// get all thoughts
	getAllThought(req, res) {
		Thought.find({})
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},

	// get one thought by id
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.thoughtId })
			.then((dbThoughtData) => {
				// If no thought is found, send 404
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	// createThought
	createThought({ params, body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// update Thought by id
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},
	// delete Thought
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	// add reaction to thought
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
			{ new: true }
		)
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},
	// delete reaction
	deleteReaction({ params }, res) {
		Comment.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbReactionData) => res.json(dbReactionData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
