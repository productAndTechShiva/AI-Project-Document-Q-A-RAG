export interface AskRequest {
  prompt: string;
}

export interface AskResponse {
  question: string;
  retrieved_chunks: number;
  answer: string;
  context: string[];
}

export interface UploadResponse {
  success: boolean;
  filename: string;
  chunks_stored: number;
}