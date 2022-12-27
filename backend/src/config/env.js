import dotenv from 'dotenv'

const currentEnv = process.env.NODE_ENV || 'development'

if (currentEnv !== 'production') {
  dotenv.config({
    path: `.env.${currentEnv || ''}`.replace(/\.$/, ''),
  })
} else {
  dotenv.config({
    path: `.env`,
  })
}
