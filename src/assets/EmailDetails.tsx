type Email = {
  id: number;
  subject: string;
  summary: string;
  urgency: string;
  content: string;
};

type EmailDetailsProps = {
  email: Email | null;
  onClose: () => void;
};

const EmailDetails = ({ email, onClose }: EmailDetailsProps) => {
  if (!email) {
    return null;
  }

  return (
    <div className="email-details">
      <h2>{email.subject}</h2>
      <p>{email.content}</p>
      <button onClick={onClose}>Back</button>
    </div>
  );
};

export default EmailDetails;
