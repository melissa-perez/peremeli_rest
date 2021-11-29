/*  Controller File
    Setting up Express, port numbers, and 
    importing the model.
*/

import * as exercises from "./model.mjs";
import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

/*
    CRUD Routing begins.
*/

/**
 * Create a new exercise with the name, reps,
 * weight, unit and date provided. All are required.
 */
app.post("/exercises", (req, res) => {
  exercises
    .createExercise(
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((exercise) => {
      res.status(201).json(exercise);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: "Request failed" });
    });
});

/**
 * Retrieve all exercises.
 */
app.get("/exercises", (req, res) => {
  exercises
    .findExercises({}, "", 0)
    .then((exercises) => {
      res.status(200).json(exercises);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: "Request failed" });
    });
});
