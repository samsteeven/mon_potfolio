import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'publications'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable()
      table.string('title').notNullable()
      table.text('description').nullable()
      table.json('tags').nullable()
      table.string('image_url').nullable()
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).nullable().defaultTo(this.now())
      table.index(['is_active', 'created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
