import { model, Schema } from 'mongoose';

const studentsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'other'],
    },
    admission: {
      type: Date,
      required: true,
    },
    subjects: Array,
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    photo: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const StudentsCollection = model('students', studentsSchema);
