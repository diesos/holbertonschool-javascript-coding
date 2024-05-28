const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n');
    const students = lines.slice(1).filter((line) => line !== '');

    const numberOfStudents = students.length;
    console.log(`Number of students: ${numberOfStudents}`);

    const fields = {
      CS: [],
      SWE: [],
    };

    students.forEach((student) => {
      const [firstname, , , field] = student.split(',').map((item) => item.trim());
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        fields[field].push(firstname);
      }
    });

    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const numberOfStudentsInField = fields[field].length;
        console.log(`Number of students in ${field}: ${numberOfStudentsInField}. List: ${fields[field].join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
