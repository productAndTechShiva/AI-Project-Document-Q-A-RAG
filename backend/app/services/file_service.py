# app/services/file_service.py

import os

from fastapi import UploadFile

from app.config import UPLOAD_DIR


def save_uploaded_file(file: UploadFile) -> str:
    """
    Save uploaded file and return file path.
    """

    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path