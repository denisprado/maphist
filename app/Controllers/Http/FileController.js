'use strict';

const File = use('App/Models/File')
const Helpers = use('Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, params, response }) {
    try {
      if (!request.file('file')) return console.log('Nenhum arquivo recebido')

      const upload = request.file('file', { size: '24mb' })

      await upload.moveAll(Helpers.tmpPath('uploads'), file => ({
        name: `${Date.now()}-${file.clientName}`
      }))

      if (!upload.movedAll()) {
        return upload.errors()
      }

      const files = await Promise.all(
        upload.movedList().map(image =>
          File.create({
            file: image.fileName,
            name: image.clientName,
            type: image.type,
            subtype: image.subtype,
            project_id: parseInt(params.id)
          })
        )
      )

      return files
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: 'Erro no upload de arquivo' })
    }
  }

  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)

    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }
}

module.exports = FileController
