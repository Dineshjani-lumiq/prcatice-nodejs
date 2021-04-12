const mongoose = require('mongoose')

const refreshSchema = new mongoose.Schema(
	{
				token: { type: String, unique: true }

	}
	
)

const model = mongoose.model('refresh', refreshSchema)

module.exports = model