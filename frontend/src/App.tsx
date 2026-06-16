import { useState } from "react";
import FileUpload from "./components/FileUpload";
import QuestionForm from "./components/QuestionForm";
import {uploadDocument, askQuestion} from "./services/api";

function App() {
  const [uploadMessage, setUploadMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [retrievedChunks, setRetrievedChunks] = useState(0);
  const [retrievedContext, setRetrievedContext] = useState<string[]>([]);
  const [lastQuestion, setLastQuestion] = useState("");

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      const result = await uploadDocument(file);

      setUploadMessage(
        `Document uploaded successfully. Stored ${result.chunks_stored} chunks.`,
      );
    } catch (error) {
      console.error(error);
      setUploadMessage("Upload failed.");
    }
    finally {
      setIsUploading(false);
    }
  };

  const handleAsk = async (question: string) => {
    setLastQuestion(question);

    try {
      setIsGenerating(true);
      const result = await askQuestion(question);
      setAnswer(result.answer);
      setRetrievedChunks(result.retrieved_chunks);
      console.log(result.retrieved_chunks)
      setRetrievedContext(result.context);
      console.log(result.context);

    } catch (error) {

      console.error(error);
      setAnswer("Failed to get answer."); 
      setRetrievedChunks(0);
      setRetrievedContext([]);
    }
    finally {
      setIsGenerating(false);
    }
  };

  const getQualityLabel = () => {

    if (!lastQuestion) {
      return "N/A";
    }

    if (retrievedChunks === 0) {
      return "No Context Retrieved";
    }

    if (retrievedChunks === 1) {
      return "Limited Context";
    }
    return "Good Context";
  };

  return (
    <div style={{ 
    maxWidth: "900px",
    margin: "40px auto",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow:"0 2px 10px rgba(0,0,0,0.1)", 
    }}>
        <h1 style={{marginBottom: "50px", textAlign: "center"}}>📄 Document Q&A Assistant (RAG)</h1>
        {/* <p style={{marginTop: "10px",color: "#666"}}>Upload PDF documents and ask natural language questions using Retrieval-Augmented Generation (RAG) powered by Llama 3.2 and ChromaDB.</p> */}
        <h2 style={{marginTop: "30px", marginBottom: "15px"}}>Upload Document</h2>
        <div style={{backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", marginBottom: "12px"}}>
          <FileUpload onUpload={handleUpload} isUploading={isUploading}/>        
          <p style={{marginTop: "15px"}}>{isUploading ? "Uploading document..." : uploadMessage}</p>
        </div>

        <h2 style={{marginTop: "30px", marginBottom: "15px"}}>Ask a Question</h2>
        <div style={{backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", marginBottom: "12px"}}>
          <QuestionForm onAsk={handleAsk} isGenerating={isGenerating}/>
        </div>
        
        <h2 style={{marginTop: "30px", marginBottom: "15px"}}>AI Answer</h2>
        <div
          style={{
            // backgroundColor: "#f8fafc",
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "16px",
            minHeight: "120px",
            lineHeight: "1.6",
          }}
        >
          {/* {isGenerating ? "Generating answer..." : answer ? answer : "Ask a question to see the answer."} */}
          <pre style={{whiteSpace: "pre-wrap", fontFamily: "inherit"}}>{isGenerating ? "Generating answer..." : answer ? answer : "Ask a question to see the answer."}</pre>
        </div>

        <h2 style={{marginTop: "30px", marginBottom: "15px"}}>RAG Information</h2>
        <div style={{backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", marginBottom: "12px"}}>
          <p> <strong>Retrieved Chunks:</strong> {retrievedChunks}</p>
        </div>

        <div style={{backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", marginBottom: "12px"}}>
          <h3 style={{marginBottom: "15px"}}>Context Used</h3>

           {
          retrievedContext.length === 0 ? (
            <div style={{color: "#666"}}>
              No retrieval data available yet.
            </div>
            ) : (
              retrievedContext.map((chunk, index) => (
                  <div key={index} style={{marginBottom: "12px", padding: "12px"}}>
                    <strong>Chunk {index + 1}</strong>
                    <p style={{marginTop: "8px", lineHeight: "1.5"}}>{chunk}</p>
                  </div>
                )
              )
            )
        }
        </div>

        <h2 style={{marginTop: "30px", marginBottom: "15px"}}>Debug Information</h2>
        <div style={{backgroundColor: "#fff8e1", border: "1px solid #facc15", borderRadius: "8px", padding: "16px"}}>
          <p style={{marginBottom: "7px"}}><strong>Question Length:</strong> {" "} {lastQuestion.length} {" "}chars</p>
          <p style={{marginBottom: "7px"}}><strong>Retrieved Context Count:</strong> {" "} {retrievedContext.length}</p>
          <p style={{marginBottom: "7px"}}><strong>Total Context Size:</strong> {" "} { retrievedContext.join(" ").length} {" "}chars</p>
          <p style={{marginBottom: "7px"}}><strong>Answer Size:</strong> {" "} {answer.length} {" "} chars</p>
          <p><strong>Source Quality:</strong> {" "} {getQualityLabel()}</p>
        </div>
    </div>
  );
}

export default App;
