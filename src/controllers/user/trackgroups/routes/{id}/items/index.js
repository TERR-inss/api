const { TrackGroup, TrackGroupItem, Track, UserGroup } = require('../../../../../../db/models')
const { authenticate } = require('../../../../authenticate')

module.exports = function () {
  const operations = {
    PUT: [authenticate, PUT],
    parameters: [
      {
        name: 'id',
        in: 'path',
        type: 'string',
        required: true,
        description: 'Trackgroup uuid.',
        format: 'uuid'
      }
    ]
  }

  async function PUT (ctx, next) {
    const body = ctx.request.body

    try {
      const creators = await UserGroup.findAll({
        where: {
          ownerId: ctx.profile.id
        }
      })

      let result = await TrackGroup.findOne({
        attributes: ['creatorId'],
        where: {
          creatorId: creators.map(c => c.id),
          id: ctx.params.id
        },
        include: [{
          model: TrackGroupItem,
          attributes: ['id', 'index'],
          as: 'items',
          include: [{
            model: Track,
            as: 'track'
          }]
        }]
      })

      if (!result) {
        ctx.status = 404
        ctx.throw(ctx.status, 'Track group does not exist or does not belong to your user account')
      }

      const count = result.items.length

      await TrackGroupItem.destroy({
        where: {
          trackgroupId: ctx.params.id
        }
      })

      // assign trackgroup id ref to each track group item
      const trackGroupItems = body.tracks.map((item, index) => {
        const o = Object.assign(item, {
          trackgroupId: ctx.params.id
        })
        if (!item.index) {
          o.index = count + 1
        }
        return o
      })

      await TrackGroupItem.bulkCreate(trackGroupItems)

      result = await TrackGroupItem.findAll({
        where: {
          trackgroupId: ctx.params.id
        },
        include: [{
          model: Track,
          as: 'track'
        }],
        order: [
          ['index', 'ASC']
        ]
      })

      ctx.body = {
        data: result,
        status: 'ok'
      }
    } catch (err) {
      ctx.throw(ctx.status, err.message)
    }

    await next()
  }

  // FIXME: add body validation in open api spec
  PUT.apiDoc = {
    operationId: 'updateTrackgroupItems',
    description: 'Replace existing trackgroup items if any',
    tags: ['trackgroups'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        type: 'string',
        required: true,
        description: 'Trackgroup uuid',
        format: 'uuid'
      }, {
        in: 'body',
        name: 'trackgroupItems',
        schema: {
          type: 'object',
          additionalProperties: false,
          required: ['tracks'],
          properties: {
            tracks: {
              type: 'array',
              items: {
                type: 'object',
                required: ['trackId'],
                properties: {
                  trackId: {
                    type: 'string',
                    format: 'uuid'
                  },
                  title: {
                    type: 'string'
                  },
                  index: {
                    type: 'number',
                    minimum: 1
                  }
                }
              }
            }
          }
        }
      }
    ],
    responses: {
      200: {
        description: 'The updated trackgroup items',
        schema: {
          $ref: '#definitions/ArrayOfTrackGroupItems'
        }
      },
      404: {
        description: 'No trackgroup found.'
      },
      default: {
        description: 'Unexpected error',
        schema: {
          $ref: '#/definitions/Error'
        }
      }
    }
  }

  return operations
}
