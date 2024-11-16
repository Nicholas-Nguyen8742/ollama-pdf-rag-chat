import { Pool, PoolConfig } from 'pg';
import { DATABASE_URL, NODE_ENV } from '../utils';

let conn: PoolConfig = ['production'].includes(NODE_ENV)
  ? {
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 10000,
    query_timeout: 50000,
    max: 10,
  }
  : {
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    }
  };

// Connecting only to Local Databases for Local Development
if (DATABASE_URL.includes('localhost')) {
  conn.ssl = false;
}

const pool = new Pool(conn);

export default pool;
