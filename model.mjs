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

/**
 * Retrieve all the exercises in the collection.
 * @param {Object} filter
 * @param {String} projection
 * @param {Number} limit
 * @returns A promise. Resolves to the number of matching documents.
 */
const findExercises = async (filter, projection, limit) => {
  const query = Exercise.find(filter).select(projection).limit(limit);
  return query.exec();
};

/**
 * Update the identified exercise with the new information.
 * All five parameters will be provided and valid.
 * A path parameter containining a valid id for an existing document/ID
 * will also be provided.
 * @param {String} exerciseName
 * @param {Number} exerciseReps
 * @param {Number} exerciseWeight
 * @param {String} exerciseUnit
 * @param {String} exerciseDate
 * @returns A promise. Resolves to the number of documents modified.
 */
const updateExercise = async (
  id,
  exerciseName,
  exerciseReps,
  exerciseWeight,
  exerciseUnit,
  exerciseDate
) => {
  const result = await Exercise.replaceOne(
    { _id: id },
    {
      name: exerciseName,
      reps: exerciseReps,
      weight: exerciseWeight,
      unit: exerciseUnit,
      date: exerciseDate,
    }
  );
  return result.nModified;
};

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

export { createExercise, findExercises, updateExercise };
