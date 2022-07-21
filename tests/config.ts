import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })

export const USERNAME = process.env.ZOUL_USER ?? 'test@zubale.com'
export const PASSWORD = process.env.ZOUL_PASSWORD ?? 'zubale123'
export const BASE_URL = process.env.CI === 'true' ? '' : 'http://localhost:4000'
