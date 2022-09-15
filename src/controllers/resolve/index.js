const Router = require('@koa/router')
const cors = require('@koa/cors')
const { initialize } = require('koa-openapi')
const openapiDoc = require('./api-doc')

const resolve = new Router()
const router = new Router()

initialize({
  router,
  basePath: '/v3/resolve',
  apiDoc: openapiDoc,
  paths: [
    { path: '/apiDocs', module: require('./routes/apiDocs') },
    { path: '/', module: require('./routes') }
  ]
})

resolve.use(cors())
resolve.use('/resolve', router.routes(), router.allowedMethods({ throw: true }))

module.exports = resolve