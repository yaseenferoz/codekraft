export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload?.project?.email || !payload?.project?.message) {
    return Response.json(
      { ok: false, message: "Missing required contact payload fields." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "CodeKraft <onboarding@resend.dev>";
  const deliveryEmail = "codekraftgulbarga@gmail.com";

  if (resendApiKey) {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [deliveryEmail],
        reply_to: payload.project.email,
        subject: `CodeKraft project enquiry from ${payload.project.name}`,
        text: JSON.stringify(payload.project, null, 2),
      }),
    });

    if (!resendResponse.ok) {
      return Response.json(
        {
          ok: false,
          mode: "resend-error",
          message: "Resend could not send this message. Falling back to mail client is recommended.",
        },
        { status: 502 },
      );
    }

    return Response.json({
      ok: true,
      recipient: deliveryEmail,
      mode: "resend",
      message: "Project brief sent to CodeKraft inbox.",
    });
  }

  return Response.json({
    ok: true,
    recipient: deliveryEmail,
    mode: "mailto-handoff",
    message:
      "Contact payload accepted. Add RESEND_API_KEY to send automatically from this route.",
  });
}
