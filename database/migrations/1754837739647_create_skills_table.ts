import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'skills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name', 191).notNullable().index()
      table.string('category', 191).nullable().index()
      table.text('description').nullable()
      table.string('image_path').nullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable().defaultTo(this.now())
      table.unique(['name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
