import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'technologies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id')
      table.string('name').notNullable().index()
      table.string('category').notNullable().index()
      table.string('img_path').notNullable()
      table.string('lien_origin').nullable()
      table.text('description').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable().defaultTo(this.now())
      table.unique(['name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
