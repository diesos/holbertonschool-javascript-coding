#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const todo = JSON.parse(body);

    const completedTasksByUser = {};

    // Browses tasks in the JSON response.
    for (const task of todo) {
      // Checks if the task has been completed.
      if (task.completed) {
        // Gets the user ID of the task.
        const userId = task.userId;

        if (completedTasksByUser[userId]) {
          completedTasksByUser[userId]++;
        } else {
        // user has completed its 1st task.
          completedTasksByUser[userId] = 1;
        }
      }
    }

    console.log(completedTasksByUser);
  } else {
    console.error(error || `Code d'état ${response.statusCode}`);
  }
});
