const { error } = require('../src/constants');
const File = require('../src/file');
const { rejects, deepStrictEqual } = require('assert');
const User = require('../src/user');

(async () => {
  {
    console.info('✅ Testing empty file');

    const filePath = '../mocks/empty-file-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    console.info('✅ Testing invalid header');

    const filePath = '../mocks/header-invalid.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    console.info('✅ Testing invalid file length');

    const filePath = '../mocks/four-items-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    console.info('✅ Testing success case');

    const filePath = '../mocks/three-items-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
      new User({
        id: 123,
        name: 'Bruno Petrolini',
        profession: 'Software Engineer',
        age: 26,
      }),
      new User({
        id: 321,
        name: 'Erick Wendel',
        profession: 'JavaScript Instructor',
        age: 25,
      }),
      new User({
        id: 231,
        name: 'Joao da Silva',
        profession: 'Java Developer',
        age: 30,
      }),
    ];

    deepStrictEqual(result, expected);
  }
})();
