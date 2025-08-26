import "@/css/apidownloadcard.css";
import SplitText from "@/TextAnimations/SplitText/SplitText";

const setupCommands = [
  {
    label: "Or Clone the repo:",
    command:
      "git clone https://github.com/Pranav-Kunjir/Manim2AnimationApi.git",
  },
  {
    label: "Enter the folder:",
    command: "cd Manim2AnimationApi",
  },
  {
    label: "Create venv:",
    command: "python -m venv venv",
  },
  {
    label: "Activate venv:",
    command: "source venv/bin/activate",
  },
  {
    label: "Install deps:",
    command: "pip install -r requirements.txt",
  },
  {
    label: "Run this everytime when you want to use the app even after setup:",
    command: "uvicorn main:app --reload",
  },
];

export default function ApiDownloadCard({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (v: boolean) => void;
}) {
  if (!visible) return null;

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
  };

  return (
    <div className="api-download-card">
      <button className="close-btn" onClick={() => setVisible(false)}>
        &times;
      </button>
      <SplitText
        text="Download the rendering app"
        className="card-heading"
        delay={100}
        duration={0.5}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        textAlign="center"
      />
      <div className="card-section">
        <a
          href="https://github.com/Pranav-Kunjir/Manim2AnimationApi/archive/refs/heads/main.zip"
          className="download-link"
          download
        >
          Download ZIP
        </a>
        <h3>Setup Instructions</h3>
        <div className="setup-list" style={{ width: "100%" }}>
          {setupCommands.map(({ label, command }, idx) => (
            <div key={idx} style={{ marginBottom: "1rem", width: "100%" }}>
              <span className="terminal-label">{label}</span>
              <div className="terminal-box">
                <code>{command}</code>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(command)}
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
        <p>
          Server will run at <code>http://127.0.0.1:8000</code>
        </p>
      </div>
    </div>
  );
}
