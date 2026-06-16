import { useState } from "react";

interface Props {
  onAsk: (question: string) => void;
  isGenerating: boolean;
}

function QuestionForm({onAsk, isGenerating}: Props) {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {

    if (!question.trim()) {
      return;
    }

    onAsk(question);
    setQuestion("");
  };

  return (
    // <>
    // <h2 style={{marginBottom: "15px"}}>Ask a Question</h2>
    <div style={{marginTop: "10px", marginBottom: "20px"}}>
      {/* <h3 style={{marginBottom: "15px"}}>Ask a Question</h3> */}
      <input
        type="text"
        value={question}
        placeholder="Ask a question about the document..."
        onChange={(e) =>
            setQuestion(
            e.target.value
            )
        }
        style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "12px",
            fontSize: "14px",
        }}
        />

      <button
        onClick={handleSubmit}
        disabled={isGenerating}
        style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#16a34a",
            color: "white",
            opacity: isGenerating ? 0.7 : 1,
        }}
        >
        {isGenerating ? "Thinking..." : "Ask"}
      </button>
    </div>
    // </>
  );
}

export default QuestionForm;