import { neon } from "@neondatabase/serverless";

export const storeUser = async (name: any, email: any, clerkId: any) => {
  try {
    const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL}`);

    const response: any = await sql`
          INSERT INTO users (name, email, clerk_id)
          VALUES (${name}, ${email}, ${clerkId})
          RETURNING *;  -- Returns the inserted row
        `;

    return response;
  } catch (error) {
    console.error(error);
  }
};
