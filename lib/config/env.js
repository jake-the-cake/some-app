const dotenv = require('dotenv')
dotenv.config()

const envVariables = {}

// Loop through all environment variables and add them to the envVariables object
for (const key in process.env) {
  if (process.env.hasOwnProperty(key)) envVariables[key] = process.env[key]
}

module.exports = envVariables