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
      res.type("application/json");
      res.status(201).json(exercise);
    })
    .catch((error) => {
      console.log(error);
      res.type("application/json");
      res.status(400).json({ Error: "Request failed" });
    });
});
