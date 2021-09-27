import { join } from 'path'

export const orm = {
  type: 'sqlite',
  database: join(__dirname, '../../demo.sqlite'),
  synchronize: true,
  logging: true,
};
