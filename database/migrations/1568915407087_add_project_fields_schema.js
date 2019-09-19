'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddProjectFieldsSchema extends Schema {
  up () {
    this.table('projects', table => {
      table.text('description', 'longtext')
      table.decimal('lng', null)
      table.decimal('lat', null)
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('projects', table => {
      // reverse alternations
    })
  }
}

module.exports = AddProjectFieldsSchema
