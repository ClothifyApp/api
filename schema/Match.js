let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const MatchSchema = new Schema(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    garments: [{
      type: Schema.Types.ObjectId,
      ref: 'Garment'
    }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('Match', MatchSchema);
