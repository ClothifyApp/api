const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    type: {
      type: String,
      enum: ['like', 'superlike', 'dislike'],
      default: 'like',
      required: true
    },
    garmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Garment'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

module.exports = mongoose.model('Reaction', ReactionSchema);
