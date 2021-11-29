/*
    Model File
    Setting up MongoDB, Mongoose, and Options.
*/

import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/exercises_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

/*
    Create the schema and compile the model.
*/
const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * Create an exercise
 * @param {String} exerciseName
 * @param {Number} exerciseReps
 * @param {Number} exerciseWeight
 * @param {String} exerciseUnit
 * @param {String} exerciseDate
 * @returns A promise. Resolves to the JSON object for the document created by calling save.
 */
const createExercise = async (
  exerciseName,
  exerciseReps,
  exerciseWeight,
  exerciseUnit,
  exerciseDate
) => {
  const exercise = new Exercise({
    name: exerciseName,
    reps: exerciseReps,
    weight: exerciseWeight,
    unit: exerciseUnit,
    date: exerciseDate,
  });

  return exercise.save();
};

// /**
//  * Retrieve user(s) based on the filters provided.
//  * @param {Array} filters
//  * @returns A promise. Resolves to the number of matching documents.
//  */
// const findUsers = async (filters) => {
//   const query = User.find();
//   if (filters.length > 0) {
//     query.and(filters);
//   }
//   return query.exec();
// };

// /**
//  * Replace/update/insert the appropriate parameter of the user with the id value provided.
//  * @param {String} _id
//  * @param {String} [userName]
//  * @param {Number} [userAge]
//  * @param {String} [userEmail]
//  * @param {Number} [userPhoneNumber]
//  * @returns A promise. Resolves to the number of documents modified.
//  */
// const updateUser = async (_id, fieldsToUpdate) => {
//   const result = await User.findOneAndUpdate(
//     { _id: _id },
//     { $set: fieldsToUpdate },
//     { rawResult: true }
//   );
//   if (result.value === null) {
//     throw new Error();
//   }
//   return result.lastErrorObject.n;
// };

// /**
//  * Deletes user(s) that match the provided values.
//  * @param {String} [_id]
//  * @param {String} [userName]
//  * @param {Number} [userAge]
//  * @param {String} [userEmail]
//  * @param {Number} [userPhoneNumber]
//  * @returns A promise. Resolves to the number of documents deleted.
//  */
// const deleteUsers = async (documentsToDelete) => {
//   const result = await User.deleteMany(documentsToDelete);
//   return result.deletedCount;
// };

export { createExercise };
