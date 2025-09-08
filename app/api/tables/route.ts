import { getTablesData } from "@/lib/tables";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getTablesData();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error to get data:", error);
    return NextResponse.json(
      { error: "Error to get data" },
      { status: 500 }
    );
  }
}
