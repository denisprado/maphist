'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddYearsFieldsToProjectsSchema extends Schema {
  up () {
    this.table('projects', table => {
      table.integer('start_year')
      table.integer('end_year')
    })
  }

  down () {
    this.table('projects', table => {
      // reverse alternations
    })
  }
}

module.exports = AddYearsFieldsToProjectsSchema
