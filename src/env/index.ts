import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(4444),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('A Invalid enviroment variable', _env.error.format())

  throw new Error('Invalid enviroment variable')
}

export const env = _env.data
