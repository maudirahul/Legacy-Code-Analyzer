# 🔭 ArchLens (Legacy Code Analyzer)

> An automated codebase visualization and AI-powered analysis tool designed to simplify system maintenance, accelerate developer onboarding, and make refactoring legacy code safe and predictable.

---

## ✨ Features

* **📂 Seamless Ingestion:** Upload legacy code via `.zip` archive or directly import repositories using a GitHub URL.
* **🕸️ Interactive Dependency Graphs:** Automatically parses your codebase using AST (Abstract Syntax Tree) to map out file dependencies, imports, and exports visually using D3.js.
* **🤖 AI Code Insights:** Powered by the Gemini API, get instant explanations of file responsibilities and architectural choices.
* **🔒 Privacy First:** CodeInsight only analyzes structural metadata (imports, exports, file names). Your core business logic and proprietary algorithms are never sent to the AI.
* **⚡ Modern UI/UX:** Built with React, Tailwind CSS, and global toast notifications for a smooth, app-like experience.

*(Note: Currently, ArchLens's AST engine exclusively supports **JavaScript/Node.js** environments including React, Express, Vue, etc. Support for Python and Java is planned for future iterations).*

---

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* React Query (Data Fetching)
* React-Toastify (Notifications)
* D3.js (Graph Visualizations)

**Backend:**
* Node.js & Express.js
* MongoDB (Mongoose)
* AST Parsers (for structural analysis)
* Google Gemini API (for AI insights)

---

