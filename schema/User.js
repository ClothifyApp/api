const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true,

    },
    fullName: String,
    photoUrl: String,
    uuid: {
      type: String,
      required: true,
    },
    country: String,
    gender: {
      type: String,
      enum: ['F', 'M', 'N'],
    },
    preferences: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

module.exports = mongoose.model('User', UserSchema);
