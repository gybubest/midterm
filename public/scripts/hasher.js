const md5 = require('md5')

const urlCreator = () => {
  const string = 'where should we go for lunch?'
  const starter = Math.random().toString(36).substring(7);
  return md5(starter+string)
}

console.log(urlCreator())
console.log(urlCreator())
console.log(urlCreator())
console.log(urlCreator())
console.log(urlCreator())
console.log(urlCreator())
