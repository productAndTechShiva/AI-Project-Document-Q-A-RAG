# 📄 Document Q&A Assistant (RAG)

# Project Overview

Document Q&A Assistant is an AI-powered application that enables users to upload PDF documents and ask questions about their content. Built using Retrieval-Augmented Generation (RAG), the system combines semantic search and LLMs to deliver accurate, context-aware answers from uploaded documents.

# Problem Statement

Organizations rely on large volumes of documents to store important information. However, finding relevant answers quickly can be difficult, and traditional keyword search often produces incomplete or irrelevant results.

# Key Features

### Document Upload

* Upload PDF documents
* Extract document text automatically
* Prepare content for semantic processing

### Intelligent Retrieval

* Semantic search instead of keyword matching
* Retrieval based on meaning and context
* Relevant document sections identified automatically

### AI-Powered Question Answering

* Natural language interaction
* Context-aware responses
* Answers grounded in retrieved document content

### Retrieval Transparency

* Display retrieved chunks
* Show retrieval metadata
* Improve explainability and trust

### RAG Debug Information

* Retrieved chunk count
* Context size
* Question length
* Answer size
* Source quality indicators

### Screenshots
<img width="3867" height="2732" alt="combined_img" src="https://github.com/user-attachments/assets/78db09fc-8b12-42d1-804c-0027248c60c5" />


# RAG Workflow

```text
PDF Upload
    ↓
Text Extraction
    ↓
Document Chunking
    ↓
Embedding Generation
    ↓
Vector Storage (ChromaDB)
    ↓
Semantic Search
    ↓
Relevant Context Retrieval
    ↓
Prompt Construction
    ↓
LLM Response Generation
    ↓
Answer Presentation
```

# AI Concepts Implemented

* Retrieval-Augmented Generation (RAG) - Enhances LLM responses by retrieving relevant information from external knowledge sources before answer generation.
* Embeddings - Converts text into numerical vector representations to enable semantic similarity comparisons.
* Vector Database - Stores embeddings for efficient retrieval of relevant document content.
* Semantic Search - Retrieves information based on meaning rather than exact keyword matching.
* Chunking - Breaks large documents into smaller sections suitable for embedding and retrieval.
* Prompt Engineering - Constructs prompts that guide the model to use retrieved context while reducing hallucinations.
* Context Injection - Supplies relevant document content to the LLM before answer generation.


# Technology Stack

* Backend - Python, FastAPI
* Frontend - React, TypeScript, Vite
* AI & RAG Layer - Ollama, Llama 3.2 (3B), nomic-embed-text, ChromaDB, Semantic Search, Retrieval-Augmented Generation (RAG)


# Application Architecture

```text
Frontend (React + TypeScript)
            │
            ▼
      FastAPI Backend
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼

PDF      Embedding   Vector
Parser     Model     Database

            │
            ▼
      Semantic Search
            │
            ▼
        Llama 3.2
            │
            ▼
       Final Answer
```


# Key Learnings

Building this application reinforced several important observations about AI products:

* Answer quality depends on retrieval quality as much as the LLM itself
* Effective chunking significantly influences retrieval performance
* Embeddings and semantic search are critical components of RAG systems
* Prompt design helps guide model behavior and reduce hallucinations
* Retrieval transparency improves user trust and explainability
* AI products require orchestration of multiple components, not just a powerful model


# Future Enhancements

Potential improvements include:

* Multi-document support
* Document management dashboard
* Conversation history
* Source citation and references
* Hybrid search (semantic + keyword)
* Re-ranking models
* User authentication and authorization
* Cloud deployment
* Production monitoring and observability
* Evaluation framework for retrieval quality


# Repository Purpose

This project was built as a hands-on learning initiative to explore the practical implementation of Retrieval-Augmented Generation (RAG) systems and to better understand the product, business and technical considerations involved in developing AI-powered knowledge retrieval applications.
