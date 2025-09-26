export const reminder20m = ({ patientName, doctorName, date, time, clinic }) => `
  <div style="font-family:Arial,sans-serif">
    <h3>Appointment in 20 minutes</h3>
    <p>Hi ${patientName},</p>
    <p>This is a reminder of your appointment with <b>Dr. ${doctorName}</b> today at <b>${time}</b> (${date}).</p>
    ${clinic ? `<p>Location: ${clinic}</p>` : ""}
    <p>See you soon.</p>
  </div>
`;
