"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddProjectIdToFilesSchema extends Schema {
  up() {
    this.table("files", table => {
      table
        .integer("project_id")
        .unsigned()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("files", table => {
      // reverse alternations
    });
  }
}

module.exports = AddProjectIdToFilesSchema;
