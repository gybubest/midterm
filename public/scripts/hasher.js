const md5 = require('md5')

// feeding poll question to function should greatly reduce chance of duplicate urls being formed.
const urlCreator = (string) => {
  const starter = Math.random().toString(36).substring(7);
  return md5(starter+string)
}
