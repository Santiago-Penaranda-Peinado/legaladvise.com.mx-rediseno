import json
from docx import Document
from pypdf import PdfReader
import os

docx_path = r"context\PÁGINA WEB LA.docx"
pdf_path = r"context\LEGAL ADVISE BROCHURE ESPAÑOL.pdf"

content = {"docx": [], "pdf": []}

try:
    doc = Document(docx_path)
    for para in doc.paragraphs:
        if para.text.strip():
            content["docx"].append(para.text.strip())
except Exception as e:
    print(f"Error docx: {e}")

try:
    reader = PdfReader(pdf_path)
    for page in reader.pages:
        text = page.extract_text()
        if text:
            content["pdf"].append(text.strip())
except Exception as e:
     print(f"Error pdf: {e}")

with open("extracted_content.json", "w", encoding="utf-8") as f:
    json.dump(content, f, ensure_ascii=False, indent=2)

print("Content extracted successfully to extracted_content.json")
