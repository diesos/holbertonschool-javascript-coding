const fs = require('fs');

async function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const students = data.split('\n').filter(Boolean).slice(1).map((line) => {
        const [firstname, lastname, age, field] = line.split(',');
        return {
          firstname, lastname, age, field,
        };
      });

      const csStudents = students.filter((student) => student.field === 'CS');
      const sweStudents = students.filter((student) => student.field === 'SWE');

      console.log(`Number of students: ${students.length}`);
      console.log(`Number of students in CS: ${csStudents.length}. List: ${csStudents.map((student) => student.firstname).join(', ')}`);
      console.log(`Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.map((student) => student.firstname).join(', ')}`);
      resolve();
    });
  });
}

module.exports = countStudents;
