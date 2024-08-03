import mongoose from 'mongoose';

const {Schema} = mongoose;

const VideoSchema = new Schema({
	url: {
		type: String,
		required: true
	},
	videoId: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ''
	},
	width: {
		type: Number,
		required: true
	},
	height: {
		type: Number,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const TapeSchema = new Schema({
	tapeId: {
		type: String,
		required: true
	},
	tapeTitle: {
		type: String,
		required: true
	},
	tapeData: [VideoSchema]
});

const UserTapeSchema = new Schema({
	userId: {
		type: String,
		required: true,
		unique: true
	},
	tapes: [TapeSchema]
});

let Tapes;

try {
	Tapes = mongoose.model('Tapes');
} catch (e) {
	Tapes = mongoose.model('Tapes', UserTapeSchema);
}

export default Tapes;
