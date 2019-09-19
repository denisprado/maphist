'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  files () {
    return this.hasMany('App/Models/File')
  }
}

module.exports = Project
