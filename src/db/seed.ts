import pool from "../config/db";

async function seed() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      )
    `);

    await pool.query(`
      INSERT INTO users (name)
      VALUES ('Sophea'), ('John')
    `);

    console.log("✅ Seed done");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

seed();