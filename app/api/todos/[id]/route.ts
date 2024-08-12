import { db, todoTable } from "@/.drizzle/config";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,{params}: {params: {id: number}}) => {
    try {
      const data = await db.select().from(todoTable).where(eq(todoTable.id, params.id));
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

export const PUT = async (
  reqest: NextRequest,
  { params }: { params: { id: number } }
) => {

    try {
        const {id, task, completed} = await reqest.json();
        await db.update(todoTable).set({id: id, task: task, completed: completed}).where(eq(todoTable.id, params.id)).returning();
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
};


export const DELETE = async(res: NextRequest, {params}: {params: {id: number}})=>{
  try {
    await db.delete(todoTable).where(eq(todoTable.id, params.id));
    return NextResponse.json({
      statuCode: 200,
      message: "Success",
    });
  } catch (error) {
    return NextResponse.json({
      statuCode: 500,
      statuText: error,
    });
  }
}