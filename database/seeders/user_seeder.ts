import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      email: 'samendjiaha@gmail.com',
      username: 'samen admin',
      password: 'password',
      role: 'admin',
      isActive: true,
    })
  }
}
