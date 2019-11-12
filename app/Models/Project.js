'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  files () {
    return this.hasMany('App/Models/File')
  }

  categories () {
    return this.belongsToMany('App/Models/Category').pivotTable(
      'project_categories'
    )
  }
}

module.exports = Project
