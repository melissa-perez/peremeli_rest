/*  Controller File
    Setting up Express, port numbers, and 
    importing the model.
*/

import * as users from "./model.mjs";
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
 * weight, unit and date provided.
 */
app.post("/exercises", (req, res) => {});

// /**
//  * Retrieve users.
//  * If the query parameters include more than one queries, the
//  * documents that match all queries are returned.
//  * Otherwise, all documents are returned.
//  */
// app.get("/retrieve", (req, res, next) => {
//   users
//     .findUsers(req.getFilters)
//     .then((users) => {
//       res.send(users);
//     })
//     .catch((error) => {
//       res.send({ error: "Request failed" });
//     });
// });

// /**
//  * Update the user whose _id is provided and replace the
//  * appropriate values with the provided values if applicable.
//  * If an existing values does not have to update, then it will
//  * not replace its value. If a value to update does not exist
//  * add it to the document.
//  */
// app.get("/update", (req, res) => {
//   users
//     .updateUser(req.query._id, req.query)
//     .then((result) => {
//       res.send({ modifiedCount: result });
//     })
//     .catch((error) => {
//       res.send({ Error: "Not found" });
//     });
// });

// /**
//  * Delete the user or users who match
//  * the provided query parameters.
//  */
// app.get("/delete", (req, res) => {
//   users
//     .deleteUsers(req.query)
//     .then((result) => {
//       res.send({ deletedCount: result });
//     })
//     .catch((error) => {
//       res.send({ Error: "Not found" });
//     });
// });

// /**
//  * Takes the request query parameters and builds an array
//  * of objects to provide AND parameters to the find functionality.
//  * @param {Object} queries
//  * @returns An array of objects for filters.
//  */
// function createFilterArray(queries) {
//   const filters = [];
//   Object.keys(queries).map(function (key) {
//     const filter = {};
//     const filterName = key;
//     filter[filterName] = queries[key];
//     filters.push(filter);
//   });

//   return filters;
// }

// /**
//  * Function used as part of the middleware to
//  * update query type counts and log information to the
//  * screen.
//  */
// function logStatistics(req, res, next) {
//   let getFilters = createFilterArray(req.query);
//   counterStats.increaseTotal();
//   if (getFilters.length === 0) {
//     counterStats.increaseZero();
//   } else {
//     counterStats.increaseOneOrMore();
//   }
//   if (counterStats.totalValue() % 10 === 0) {
//     console.log(`Total retrieve requests: ${counterStats.totalValue()}`);
//     console.log(
//       `Retrieve requests with 0 query parameters: ${counterStats.zeroValue()}`
//     );
//     console.log(
//       `Retrieve requests with 1 or more query parameters: ${counterStats.oneOrMoreValue()}`
//     );
//   }
//   req.getFilters = getFilters;
//   next();
// }

// /**
//  * Helper private, closure function to keep
//  * counts for statistic middleware.
//  */
// const counterStats = (function () {
//   let totalRetrieveRequests = 0;
//   let zeroQueryRequests = 0;
//   let oneOrMoreRequests = 0;

//   return {
//     increaseTotal: function incrementTotal() {
//       totalRetrieveRequests += 1;
//     },
//     increaseZero: function incrementZero() {
//       zeroQueryRequests += 1;
//     },
//     increaseOneOrMore: function incrementOneOrMore() {
//       oneOrMoreRequests += 1;
//     },
//     totalValue: function () {
//       return totalRetrieveRequests;
//     },
//     zeroValue: function () {
//       return zeroQueryRequests;
//     },
//     oneOrMoreValue: function () {
//       return oneOrMoreRequests;
//     },
//   };
// })();
