import {Pool} from 'pg';

export const connect = (host: string, port: number) => new Pool({
  user: 'postgres',
  host,
  database: 'popolodb',
  password: 'postgres',
  port,
});
