import React from "react";
import "./EmailDetails.css";

type Email = {
  id: number;
  subject: string;
  summary: string;
  urgency: string;
  content: string;
  longversion: {
    from: string;
    to: string;
    body: string;
  };
};

type EmailDetailsProps = {
  email: Email | null;
  onClose: () => void;
  onAddEvent: (email: Email) => void;
};

const EmailDetails = ({ email, onClose, onAddEvent }: EmailDetailsProps) => {
  if (!email) {
    return null;
  }

  return (
    <div className="email-details-2">
      <h2>{email.subject}</h2>
      <p>
        <strong>From:</strong> {email.longversion.from}
      </p>
      <p>
        <strong>To:</strong> {email.longversion.to}
      </p>
      <p>{email.longversion.body}</p>
      <div className="email-details-buttons">
        <button onClick={onClose} className="back-button-2">
          Back
        </button>
        <button onClick={() => onAddEvent(email)} className="add-event-button">
          Add Event
        </button>
      </div>
    </div>
  );
};

export default EmailDetails;
