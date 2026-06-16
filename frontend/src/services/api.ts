import axios from "axios";

import {
  AskResponse,
  UploadResponse,
} from "../types";

const API_BASE_URL =
  "http://127.0.0.1:8000";

export async function uploadDocument(
  file: File
): Promise<UploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(`${API_BASE_URL}/store-document`, formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
}

export async function askQuestion(
  question: string
): Promise<AskResponse> {
  const response = await axios.post(
    `${API_BASE_URL}/ask`,
    {
      prompt: question,
    }
  );

  return response.data;
}