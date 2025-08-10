import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { User } from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class SubInfo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column({ columnName: 'profil_github' })
  declare profilGithub: string | null

  @column({ columnName: 'profil_linkedin' })
  declare profilLinkedin: string | null

  @column({ columnName: 'profil_twitter' })
  declare profilTwitter: string | null

  @column({ columnName: 'profil_mail' })
  declare profilMail: string | null

  @column({ columnName: 'photo_path' })
  declare photoPath: string | null

  @column()
  declare phone: string | null

  @column()
  declare bio: string | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
