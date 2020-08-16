let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const ReactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    super: Boolean,
    isLike: Boolean,
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

module.exports = mongoose.model('Garment', ReactionSchema);
