'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectCategoriesSchema extends Schema {
  up () {
    this.create('project_categories', table => {
      table.increments()
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('project_categories')
  }
}

module.exports = ProjectCategoriesSchema
