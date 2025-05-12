import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { status } = body;

    if (typeof status === "boolean") {
      console.log("Received status (Next.js API):", status);

      return NextResponse.json(
        { message: "Status received successfully", status },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid status. It must be a boolean value." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const format = request.nextUrl.searchParams.get("format");
    const currentMotionStatus = null;
    console.log(
      `Received GET request. Current motion status: ${currentMotionStatus}`
    );

    return NextResponse.json(
      {
        message: "Current motion status",
        status: currentMotionStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your GET request." },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
