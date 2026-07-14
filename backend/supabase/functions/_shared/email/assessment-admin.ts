import type { AssessmentNotification } from "../types.ts";

export function buildAssessmentAdminEmail(assessment: AssessmentNotification) {
  const {
    businessName,
    contactName,
    email,
    phone,
    website,
    businessLocation,
    industry,
    description,
    primaryServices,
    idealCustomers,
    areasServed,
    challenges,
    otherChallenge,
    goals,
    otherGoal,
    additionalInfo,
  } = assessment;

  return {
    subject: `New Business Growth Assessment: ${businessName}`,

    html: `
      <h2>New Business Growth Assessment</h2>

      <h3>Business Information</h3>

      <p><strong>Business:</strong> ${businessName}</p>
      <p><strong>Contact:</strong> ${contactName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Website:</strong> ${website || "Not provided"}</p>
      <p><strong>Location:</strong> ${businessLocation}</p>
      <p><strong>Industry:</strong> ${industry}</p>

      <hr>

      <h3>Business Overview</h3>

      <p><strong>Description</strong></p>
      <p>${description}</p>

      <p><strong>Primary Services</strong></p>
      <p>${primaryServices}</p>

      <p><strong>Ideal Customers</strong></p>
      <p>${idealCustomers}</p>

      <p><strong>Areas Served</strong></p>
      <p>${areasServed}</p>

      <hr>

      <h3>Current Challenges</h3>

      <p>${challenges.join(", ")}</p>

      ${
        otherChallenge
          ? `
      <p><strong>Other Challenge</strong></p>
      <p>${otherChallenge}</p>
      `
          : ""
      }

      <hr>

      <h3>Business Goals</h3>

      <p>${goals.join(", ")}</p>

      ${
        otherGoal
          ? `
      <p><strong>Other Goal</strong></p>
      <p>${otherGoal}</p>
      `
          : ""
      }

      <hr>

      <h3>Additional Information</h3>

      <p>${additionalInfo || "None provided"}</p>
    `,
  };
}
