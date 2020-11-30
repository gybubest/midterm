const md5 = require('md5')

const urlCreator = () => {
  const starter = Math.random().toString(36).substring(7);
  return md5(starter)
}

console.log(urlCreator())
console.log(urlCreator())
console.log(urlCreator())
console.log(urlCreator())
console.log(urlCreator())
console.log(urlCreator())
