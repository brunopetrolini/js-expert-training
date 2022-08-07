const { readFile } = require('fs/promises');
const { join } = require('path');
const { error } = require('./constants');
const User = require('./user');

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

class File {
  static async getFileContent(filePath) {
    const filename = join(__dirname, filePath);
    return (await readFile(filename)).toString('utf8');
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [headers, ...content] = csvString.split('\n');

    const isContentLengthAccepted = content.length > 0 && content.length <= options.maxLines;
    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    const isHeaderValid = headers === options.fields.join(',');
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCsvToJson(csvString) {
    const lines = csvString.split('\n');
    const headers = lines.shift().split(',');
    return lines.map(line => {
      const columns = line.split(',');
      let user = {};
      for (const index in columns) {
        user[headers[index]] = columns[index];
      }
      return new User(user);
    });
  }

  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    return File.parseCsvToJson(content);
  }
}

module.exports = File;
