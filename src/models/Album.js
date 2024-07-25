import mongoose from 'mongoose';

const {Schema} = mongoose;

const ImageSchema = new Schema({
	url: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ''
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
