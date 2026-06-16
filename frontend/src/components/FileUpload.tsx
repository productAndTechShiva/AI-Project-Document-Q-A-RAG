import { useState } from "react";

interface Props {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

function FileUpload({onUpload, isUploading}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const handleUpload = () => {
    if (!file) return;
    onUpload(file);
  };

  return (
    <div style={{marginBottom: "10px", paddingTop: "10px"}}>
      {/* <h3 style={{marginBottom: "15px",}}>Upload Document</h3> */}
      <input
        type="file"
        accept=".pdf"
        style={{
            marginBottom: "10px",
            display: "block",
        }}
        onChange={(e) =>
            setFile(
            e.target.files?.[0] || null
            )
        }
        />
      {/* {file && (<p style={{marginBottom: "10px", color: "#555",}}>Selected:{" "} {file.name}</p>)} */}

      <button onClick={handleUpload} disabled={isUploading} 
        style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor:"#2563eb",
            color: "white",
            opacity: isUploading ? 0.7 : 1,
        }}
        >
        {isUploading ? "Uploading..." : "Upload PDF"}
        </button>
    </div>
  );
}

export default FileUpload;