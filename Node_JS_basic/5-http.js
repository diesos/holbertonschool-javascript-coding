const http = require('http');
const fs = require('fs');

function countStudents(filepath) {
  return new Promise((resolve, reject) => {
    fs.promises.readFile(filepath, { encoding: 'utf8' })
      .then((csv) => {
        const headerArray = csv.split(/\r?\n|\n/);
        const headers = headerArray[0].split(',');

        const dictList = [];
        const noHeaderArray = headerArray.slice(1);
        for (let i = 0; i < noHeaderArray.length; i += 1) {
          const data = noHeaderArray[i].split(',');
          if (data.length === headers.length) {
            const row = {};
            for (let j = 0; j < headers.length; j += 1) {
              row[headers[j].trim()] = data[j].trim();
            }
            dictList.push(row);
          }
        }

        let countCS = 0;
        let countSWE = 0;
        const studentsCS = [];
        const studentsSWE = [];

        dictList.forEach((element) => {
          if (element.field === 'CS') {
            countCS += 1;
            studentsCS.push(element.firstname);
          } else if (element.field === 'SWE') {
            countSWE += 1;
            studentsSWE.push(element.firstname);
          }
        });

        const countStudents = countCS + countSWE;

        resolve({
          countStudents,
          countCS,
          countSWE,
          studentsCS,
          studentsSWE,
        });
      })
      .catch((error) => {
        console.error('Error reading file:', error);
        reject(new Error('Cannot load the database'));
      });
  });
}

const pathToDB = process.argv[2];
const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(pathToDB)
      .then(({
        countStudents,
        countCS,
        countSWE,
        studentsCS,
        studentsSWE,
      }) => {
        res.write('This is the list of our students\n');
        res.write(`Number of students: ${countStudents}\n`);
        res.write(`Number of students in CS: ${countCS}. List: ${studentsCS.join(', ')}\n`);
        res.write(`Number of students in SWE: ${countSWE}. List: ${studentsSWE.join(', ')}`);
        res.end();
      })
      .catch((error) => {
        console.error('Error in countStudents:', error.message);
        res.end('Cannot load the database');
      });
  }
});

app.listen(port, hostname);

module.exports = app;
