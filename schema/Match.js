const mongoose = require('mongoose');

const { Schema } = mongoose;

const MatchSchema = new Schema(
  {
    firstUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    secondUser: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    garments: [{
      type: Schema.Types.ObjectId,
      ref: 'Garment',
    }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = mongoose.model('Match', MatchSchema);
