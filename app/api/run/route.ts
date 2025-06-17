import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { language, code, input } = await req.json();

  if (!code)
    return NextResponse.json(
      { error: "Missing the code segment..." },
      { status: 400 }
    );

  if (!language)
    return NextResponse.json(
      { error: "Missing the Language of Program..." },
      { status: 400 }
    );

  const result = `Language: ${language}\nInput: ${input}\nCode: ${code.substring(
    0,
    30
  )}...`;

  return NextResponse.json({ output: result }, { status: 200 });
};
