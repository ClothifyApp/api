const mongoose = require('mongoose');

const { Schema } = mongoose;

const GarmentSchema = new Schema(
  {
    name: String,
    description: String,
    photos: [String],
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = mongoose.model('Garment', GarmentSchema);
