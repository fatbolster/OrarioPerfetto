import "./EmailBox.css";

type Email = {
  id: number;
  subject: string;
  summary: string;
  urgency: string;
  content: string;
};

type EmailBoxProps = {
  emails: Email[];
  setSelectedEmail: (email: Email) => void;
};

const EmailBox = ({ emails, setSelectedEmail }: EmailBoxProps) => {
  return (
    <div className="email-box">
      {emails.length === 0 ? (
        <p>No mails</p>
      ) : (
        emails.map((email) => (
          <div
            key={email.id}
            className="email-item"
            onClick={() => setSelectedEmail(email)}
          >
            <h3>{email.subject}</h3>
            {/* Ensure the urgency class is consistent with CSS */}
            <span
              className={`urgency-tag ${email.urgency
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {email.urgency.toUpperCase()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default EmailBox;
