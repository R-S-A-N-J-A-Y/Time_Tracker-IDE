import { NextRequest, NextResponse } from "next/server";

const LanguageId: Record<string, number> = {
  python: 71,
  cpp: 76,
  java: 62,
  javascript: 63,
};

export const POST = async (req: NextRequest) => {
  const { language, code, input } = await req.json();
  console.log(language, LanguageId[language]);
  // return NextResponse.json({
  //   time: 1,
  // });
  if (!code)
    return NextResponse.json(
      { stderr: "Missing the code segment..." },
      { status: 400 }
    );

  if (!language)
    return NextResponse.json(
      { stderr: "Missing the Language of Program..." },
      { status: 400 }
    );

  try {
    const res = await fetch(
      `https://${process.env.JUDGE0_API_HOST}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": process.env.JUDGE0_API_HOST!,
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
        },
        body: JSON.stringify({
          source_code: code,
          stdin: input,
          language_id: LanguageId[language],
        }),
      }
    );

    const data = await res.json();
    console.log(data);
    return NextResponse.json({
      stdout: data.stdout,
      stderr: data.stderr,
      compile_output: data.compile_output,
      time: data.time,
      memory: data.memory,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { stderr: "Error calling the Code Runner..." },
      { status: 500 }
    );
  }
};
