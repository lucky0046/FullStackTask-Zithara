import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgres://default:RUOWSLi4c2pb@ep-calm-bird-61132800.us-east-1.postgres.vercel-storage.com:5432/verceldb",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
