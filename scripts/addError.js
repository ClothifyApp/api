// eslint-disable-next-line import/no-extraneous-dependencies
const prompt = require('prompt');
const fs = require('fs');
const path = require('path');

const CTS_FILE = path.resolve('.', 'utils', 'constants.js');

const schema = {
  properties: {
    id: {
      description: 'Enter the id (ej: INTERNAL_ERROR)',
      type: 'string',
      pattern: /^[A-Z/_]+$/,
      message: 'Must be UPPERCASE letters and underscore only',
      required: true,
    },
    httpCode: {
      description: 'Enter the httpCode (ej: 404)',
      type: 'number',
      pattern: /^[0-9]+$/,
      message: 'Must be numbers only',
      required: true,
    },
    message: {
      description: 'Enter the error message (ej: Intente de nuevo.)',
      type: 'string',
      required: true,
    },
  },
};

prompt.start();

prompt.get(schema, (err, result) => {
  if (result) {
    fs.readFile(CTS_FILE, 'utf8', (error, data) => {
      if (error) {
        return console.log(error);
      }

      let constants = data.replace(
        /THE_END_OBJ: '',/g,
        `${result.id}: {
    httpCode: ${result.httpCode},
    message: '${result.message}'
  },
  THE_END_OBJ: '',`,
      );

      constants = constants.replace(
        /THE_END_NAMES: '',/g,
        `${result.id}: '${result.id}',
  THE_END_NAMES: '',`,
      );

      return fs.writeFile(CTS_FILE, constants, 'utf8');
    });

    console.log(`Successfully added this new error:
    ${result.id}: {
        httpCode: ${result.httpCode},
        message: '${result.message}'
    }
    `);
  }
  if (err) {
    console.log('BYE!');
  }

  return 'Done!';
});
