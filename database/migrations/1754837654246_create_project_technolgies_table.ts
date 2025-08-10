import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'project_technologies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')

      table
        .bigInteger('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')

      table
        .bigInteger('technologies_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('technologies')
        .onDelete('CASCADE')

      table.unique(['project_id', 'technologies_id'])
      table.index(['project_id'])
      table.index(['technologies_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
