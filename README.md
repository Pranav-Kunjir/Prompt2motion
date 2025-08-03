# 🎥 Prompt2Motion

> **Turn natural language into stunning animations — powered by AI + Manim.**

Prompt2Motion lets you **chat with an AI** to describe animations in plain English and watch them come to life as **Python + Manim code** and **rendered videos**.  
Iteratively refine your animation, preview results, and export high-quality MP4s — all in one sleek, modern UI.

---

## ✨ Features

- **🧠 AI-Powered Animation Generation**  
  Transform plain text prompts into functional Manim scripts.
- **💬 Chat Interface**  
  Talk to the assistant, tweak animations, and see instant updates.
- **🎞 Real-Time Rendering**  
  Backend renders code to MP4 with FastAPI + Manim, streamed back to you.
- **🛠 Error Auto-Fix**  
  If rendering fails, AI analyzes and fixes your Manim code automatically.
- **📜 Code Viewer**  
  Read-only CodeMirror editor with syntax highlighting & dark theme.
- **📂 Workspace & History**  
  Manage multiple chats/animations with a persistent sidebar.
- **📦 Export**  
  Download Python code & MP4 videos in one click.
- **🌌 Modern UI**  
  Full dark mode, animated bits with ReactBits, responsive layout.

---

## 🖥 Architecture Overview

```plaintext
[Frontend - React + TS]
   ├─ ChatApp (workspace logic)
   │    ├─ Chat (messages)
   │    ├─ ChatInput (prompt entry)
   │    ├─ VideoPlayer (floating preview)
   │    └─ CodeEditor (Manim code display)
   ├─ Sidebar (chat/workspace navigation + profile menu)
   ├─ Landing Page (Vanta.js animated hero + feature showcase)
   └─ FeatureSection & CardSwap (UI highlights)

[Backend - FastAPI + Python]
   ├─ Cleans AI-generated code
   ├─ Writes to animation.py
   ├─ Runs manim CLI (render MP4)
   ├─ Handles errors + returns file or JSON error
   └─ (Future) Uploads to Convex storage for permanent links

[AI Layer]
   ├─ Prompt → Detailed Instructions (Gemini via @google/genai)
   ├─ Instructions → Manim Code
   ├─ Error Handling (fix faulty code)
   └─ User Chat Context Handling

[Database - Convex]
   ├─ Stores chats, messages, generated code
   ├─ Optional video storage with signed URLs
   └─ Handles user accounts & metadata
```
