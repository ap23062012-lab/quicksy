const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const { data, error } = await resend.emails.send({
      // Use Resend's onboarding email for testing (no domain verification needed)
      from: "Quicksy <onboarding@resend.dev>",
      to: [to], // Recipient email
      subject: subject,
      text: text, // Plain text version of the email
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

module.exports = sendEmail;