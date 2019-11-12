'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const projects = await request.team
      .projects()
      .with('files')
      .with('categories')
      .fetch()

    return projects
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only([
      'title',
      'description',
      'lat',
      'lng',
      'start_year',
      'end_year'
    ])

    const categoriesQuery = request.only(['category_id'])

    const categories = categoriesQuery.category_id

    const project = request.team.projects().create(data)

    await project.categories().attach(categories)

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request }) {
    const project = await request.team
      .projects()
      .where('id', params.id)
      .with('files')
      .with('categories')
      .first()
    return project
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const data = request.only([
      'title',
      'description',
      'lat',
      'lng',
      'start_year',
      'end_year',
      'category_id'
    ])
    const project = await request.team
      .projects()
      .where('id', params.id)
      .first()

    project.merge(data)

    await project.save()

    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request }) {
    const project = await request.team
      .projects()
      .where('id', params.id)
      .first()
    await project.delete()
  }
}

module.exports = ProjectController
