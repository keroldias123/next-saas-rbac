import { drizzle } from 'drizzle-orm/node-postgres'
import {env} from '../../env'
import * as Table from './Table'

export const db = drizzle(env.DATABASE_URL, {
  schema: Table,
  casing: 'snake_case',
  logger: true,
})