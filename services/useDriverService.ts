import { neon } from "@neondatabase/serverless";

export const getDrivers = async () => {
  const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL}`);

  try {
    const result: any = await sql`SELECT * FROM drivers`;
    return result;
  } catch (err) {
    console.error(err);
  }
};
