import mongoose from 'mongoose'

const {Schema} = mongoose

const UserSchema = new Schema({
	email: String,
	pass: String,
	phone: String,
	name: String,
	pfp: String,
})

let Users

try {
	Users = mongoose.model('Users')
} catch (e) {
	Users = mongoose.model('Users', UserSchema)
}

export default Users
