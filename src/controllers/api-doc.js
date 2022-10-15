const apiDoc = {
  swagger: '2.0',
  info: {
    title: 'Resonate API',
    version: '4.0.0'
  },
  definitions: {
    Error: {
      type: 'object',
      properties: {
        code: {
          type: 'string'
        },
        message: {
          type: 'string'
        }
      },
      required: ['code', 'message']
    },
    Trackgroup: {
      type: 'object',
      properties: {
        about: {
          type: 'string'
        },
        cover: {
          type: 'string',
          format: 'uuid'
        },
        type: {
          type: 'string',
          enum: ['lp', 'ep', 'single', 'compilation']
        }
      }
    },
    Track: {
      type: 'object'
    },
    ArrayOfTrackgroupItems: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid'
          },
          index: {
            type: 'number'
          },
          trackgroupId: {
            type: 'string',
            format: 'uuid'
          },
          trackId: {
            type: 'string',
            format: 'uuid'
          },
          track: {
            type: 'object'
          }
        }
      }
    }
  },
  responses: {
    BadRequest: {
      description: 'Bad request',
      schema: {
        $ref: '#/definitions/Error'
      }
    },
    NotFound: {
      description: 'No trackgroups were found.',
      schema: {
        $ref: '#/definitions/Error'
      }
    }
  },
  paths: {}
}

module.exports = apiDoc
