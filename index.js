const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const app = express();

app.use(cors());
app.use(cookieParser());

// Normal express config defaults
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function execute_java(command) {
  const { stdout, stderr } = await exec(command);
  console.log('command output: ', stdout, 'command error: ', stderr);
  return { stdout, stderr };
}

app.get('/', async (req, res) => {
  console.log('running java test');
  const run_java = await execute_java('java helloWorld');
  console.log('java output: ', run_java);

  res.status(200).send({
    message: run_java,
  })
}
);

// start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});
