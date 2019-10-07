const swaggerUi = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    info: {
      // swagger: '2.0',
      title: "E-commerce API 說明",
      version: '1.0.0',
      description: "【 說明 】電商平台後端 API"
    },
    host: 'localhost:3000',
    // host: 'pro-ec.herokuapp.com',
    // host: 'aja-ec.herokuapp.com',
    explorer: true,
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header'
      }
    }
  },
  apis: ['./swagger/doc/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

const DisableTryItOutPlugin = function () {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => true
        }
      }
    }
  }
}

const DisableAuthorizePlugin = function () {
  return {
    wrapComponents: {
      // authorizeBtn: () => () => false
    }
  }
}

const DisableTopbarPlugin = function () {
  return {
    wrapComponents: {
      Topbar: () => () => false
    }
  }
}

const swaggerOptions = {
  swaggerOptions: {
    plugins: [
      DisableTryItOutPlugin,
      DisableAuthorizePlugin,
      DisableTopbarPlugin
    ]
  }
}

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions))
}