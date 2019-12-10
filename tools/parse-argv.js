// Parsing the process.argv array. Please refer to the official docs:
// https://nodejs.org/docs/latest/api/process.html#process_process_argv
// We expect to have key=value pairs passed as arguments. Also it is possible to pass
// only keys which will be considered as Boolean true values.

// Example:
// Running the script with following args 'key-name=value flag' will return the object
// { "key-name": "value", flag: true }

const parseArgv = (argv = []) => {
  return argv.slice(2).reduce((accumulator, arg) => {
    const [key, value] = arg.split('=')
    return { ...accumulator, [key]: typeof value !== 'undefined' ? value : true }
  }, {})
}

module.exports = { parseArgv }
