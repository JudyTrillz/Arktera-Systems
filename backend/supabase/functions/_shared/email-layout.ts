interface EmailLayoutOptions {
  title: string;
  heading: string;
  content: string;
  buttonText?: string;
  buttonUrl?: string;
}

export function buildEmailLayout({
  title,
  heading,
  content,
  buttonText,
  buttonUrl,
}: EmailLayoutOptions): string {
  const button =
    buttonText && buttonUrl
      ? `
        <div style="margin:32px 0;text-align:center;">
          <a
            href="${buttonUrl}"
            style="
              background:#111827;
              color:#ffffff;
              text-decoration:none;
              padding:14px 24px;
              border-radius:8px;
              display:inline-block;
              font-weight:600;
            "
          >
            ${buttonText}
          </a>
        </div>
      `
      : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>
</head>

<body
  style="
    margin:0;
    padding:40px 20px;
    background:#f5f7fa;
    font-family:Arial,Helvetica,sans-serif;
    color:#1f2937;
  "
>

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="max-width:640px;margin:0 auto;"
>

<tr>
<td
  style="
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    border:1px solid #e5e7eb;
  "
>

<div
  style="
    background:#111827;
    padding:32px;
    text-align:center;
  "
>
<h1
  style="
    margin:0;
    color:#ffffff;
    font-size:28px;
  "
>
Arktera Systems
</h1>

<p
  style="
    margin:10px 0 0;
    color:#d1d5db;
    font-size:14px;
  "
>
Revenue Infrastructure for Service Businesses
</p>

</div>

<div style="padding:40px;">

<h2
  style="
    margin-top:0;
    color:#111827;
  "
>
${heading}
</h2>

${content}

${button}

<hr
  style="
    border:none;
    border-top:1px solid #e5e7eb;
    margin:40px 0;
  "
>

<p
  style="
    font-size:14px;
    color:#6b7280;
    line-height:1.7;
  "
>
If you have any questions, simply reply to this email or contact us at
<strong>hello@arkterasystems.com</strong>.
</p>

</div>

<div
  style="
    background:#f9fafb;
    padding:24px;
    text-align:center;
    font-size:13px;
    color:#6b7280;
  "
>

© 2026 Arktera Systems

</div>

</td>
</tr>

</table>

</body>
</html>
`;
}
