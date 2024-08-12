import { db, todoTable } from "@/.drizzle/config";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const data = await db.select().from(todoTable);
    return NextResponse.json({
        data: data,
        statsCode: 200
      });
  } catch (error) {
    return NextResponse.json({
      statuCode: 500,
      statuText: error,
    });
  }
};

  export const POST = async (request: NextRequest)=>{
    const body = await request.json();
   try {
    await db.insert(todoTable).values(body);
    return NextResponse.json({
        statuCode: 200,
        message: "Success"
    })
   } catch (error) {
    return NextResponse.json({
        statuCode: 500,
        statuText: error,
      });
   }
}
  