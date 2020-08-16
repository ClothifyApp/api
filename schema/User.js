let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true,
      match: [/^\+{1}\d{12}$/, 'Incorrect format: Phone Number'],
    },
    fullName: String,
    photoUrl: String,
    uuid: {
        type: String,
        required: true,
    },
    country: String,
    preferences: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('User', UserSchema);
