import mongoose from 'mongoose';

const {Schema} = mongoose;

const ImageSchema = new Schema({
	base64: {
		type: String,
		required: true
	},
	imageId: {
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

const AlbumSchema = new Schema({
	albumId: {
		type: String,
		required: true
	},
	albumTitle: {
		type: String,
		required: true
	},
	albumData: [ImageSchema]
});

const UserAlbumSchema = new Schema({
	userId: {
		type: String,
		required: true,
		unique: true
	},
	albums: [AlbumSchema]
});

let Albums;

try {
	Albums = mongoose.model('Albums');
} catch (e) {
	Albums = mongoose.model('Albums', UserAlbumSchema);
}

export default Albums;
