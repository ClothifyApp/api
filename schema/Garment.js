let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const GarmentSchema = new Schema(
  {
    name: String,
    description: String,
    photos: [String],
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('Garment', GarmentSchema);
