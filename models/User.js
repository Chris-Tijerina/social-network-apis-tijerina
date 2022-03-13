const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: "Username is Required",
			trim: true,
		},
		email: {
			type: String,
			required: "Email is Required",
			unique: true,
			match: [/.+@.+\..+/],
		},
		thoughts: [
			{
				type: Schema.ObjectId,
				ref: "thoughts",
			},
		],
		friends: [
			{
				type: Schema.ObjectId,
				ref: this.username,
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

UserSchema.virtual("friendCount").get(function () {
	return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
