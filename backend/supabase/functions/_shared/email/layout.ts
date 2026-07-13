import { EMAIL_CONFIG } from "./config.ts";

export function emailLayout(body: string) {
  return `
<!DOCTYPE html>
<html lang="en">

<body style="
  margin:0;
  padding:0;
  background:#ffffff;
  font-family:Arial,Helvetica,sans-serif;
  color:#222;
">

<table
  role="presentation"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="max-width:640px;margin:40px auto;">

${
  EMAIL_CONFIG.logoUrl
    ? `
<tr>
<td align="center" style="padding-bottom:24px;">
  <img
    src="${EMAIL_CONFIG.logoUrl}"
    alt="${EMAIL_CONFIG.companyName}"
    width="170"
    style="display:block;border:0;max-width:170px;height:auto;">
</td>
</tr>
`
    : `
<tr>
<td align="center" style="
padding-bottom:24px;
font-size:24px;
font-weight:bold;
color:#0F172A;
">
${EMAIL_CONFIG.companyName}
</td>
</tr>
`
}

<tr>
<td>

<hr style="border:none;border-top:1px solid #e5e7eb;">

</td>
</tr>

<tr>
<td style="
padding:32px 0;
font-size:16px;
line-height:1.7;
">

${body}

</td>
</tr>

<tr>
<td>

<hr style="border:none;border-top:1px solid #e5e7eb;">

</td>
</tr>

<tr>
<td style="
padding-top:24px;
font-size:15px;
line-height:1.6;
">

<strong>${EMAIL_CONFIG.founderName}</strong><br>

${EMAIL_CONFIG.founderTitle}<br>

${EMAIL_CONFIG.companyName}

<br><br>

<a
href="${EMAIL_CONFIG.website}"
style="color:#0F172A;text-decoration:none;">

${EMAIL_CONFIG.website}

</a>

</td>
</tr>

</table>

</body>
</html>
`;
}
