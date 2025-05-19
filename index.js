
// index.js file only imports the actual application from the app.js
// and then starts the application(starts the server (calls app.listen))
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
