import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    console.log(`${process.env.EXPO_PUBLIC_DATABASE_URL}`);
    let sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL}`);

    const response = await sql`SELECT * FROM drivers`;

    return Response.json({ data: response });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}
