/*  Controller File
    Setting up Express, port numbers, and 
    importing the model.
*/

import * as exercises from "./model.mjs";
import express from "express";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()).use(express.urlencoded({ extended: true }));

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
      res.status(500).json({ Error: "Cannot add exercise information" });
    });
});

/**
 * Retrieve all exercises.
 */
app.get("/exercises", (res) => {
  exercises
    .findExercises({}, "", 0)
    .then((exercises) => {
      res.status(200).json(exercises);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ Error: "Cannot display exercise information" });
    });
});

/**
 * Update the exercise which is identified by the path parameter :id.
 */
app.put("/exercises/:id", (req, res) => {
  exercises
    .updateExercise(
      req.params.id,
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )
    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.status(200).json({
          _id: req.params.id,
          name: req.body.name,
          reps: req.body.reps,
          weight: req.body.weight,
          unit: req.body.unit,
          date: req.body.date,
        });
      } else {
        res.status(500).json({ Error: "Exercise not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: "Cannot update exercise" });
    });
});

/**
 * Deletes the exercise which is identified by the path parameter :id.
 */
app.delete("/exercises/:id", (req, res) => {
  exercises
    .deleteExerciseById(req.params.id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(500).json({ Error: "Exercise not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ Error: "Cannot delete exercise" });
    });
});
