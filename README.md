# CyberShield Command

**CyberShield Command** is an immersive **Cybersecurity Simulation Game** where players take on the role of a **Security Operations Center (SOC) Analyst**. Your mission is to defend a company's infrastructure against a dynamic threat landscape using realistic tools and strategies.

![CyberShield Command Banner](frontend/src/assets/background_night.png)

## 🎮 Game Overview

The game combines **Tactical Puzzle** elements with **Real-time Defense** mechanics. You won't just click buttons; you'll analyze logs, inspect code, manage firewalls, and reverse-engineer malware to identify and neutralize vulnerabilities.

### Key Features
*   **Realistic Tools**: Use a simulated Terminal, SIEM (Security Information and Event Management), Network Monitor, and Code Editor.
*   **Diverse Threat Scenarios**: Face off against Phishing, DDoS attacks, SQL Injection, XSS, Cache Poisoning, CSRF, and more.
*   **Progressive Difficulty**:
    *   **Levels 1-3 (Weaker Learners)**: Guided tutorials on basic concepts (Phishing, DDoS).
    *   **Levels 4-6 (Average Learners)**: Intermediate challenges requiring practical skills (XSS, Cache Poisoning).
    *   **Levels 7-9 (Stronger Learners)**: Advanced scenarios with minimal guidance (Reverse Engineering, Advanced Threats).
*   **Educational Focus**: Learn real-world cybersecurity concepts and remediation techniques while playing.

## 🕹️ Levels

1.  **Phishing Defense**: Analyze email headers (SPF, DKIM) and identify social engineering attempts.
2.  **DDoS Mitigation**: Monitor traffic patterns and configure firewalls/rate-limiting to stop flood attacks.
3.  **SQL Injection**: Identify vulnerable queries and patch code using prepared statements.
4.  **XSS Defense**: Secure web portals against Cross-Site Scripting using sanitization and CSP.
5.  **Cache Poisoning**: Diagnose and fix cache vulnerabilities in reverse proxies.
6.  **CSRF Protection**: Implement tokens and SameSite cookies to prevent request forgery.
7.  **Reverse Engineering**: Decompile suspect binaries to find logic flaws and hardcoded credentials.
8.  **Ransomware Analysis**: Reverse engineer a ransomware payload to discover the kill-switch and restore infected systems.
9.  **Cryptography Defense**: Upgrade legacy DES encryption to AES-256 to secure internal communications against MITM attacks.

## 🛠️ Tech Stack

### Frontend
*   **React 18**
*   **Vite**
*   **React Router** for navigation
*   **TailwindCSS** for styling
*   **Context API** for global state management (Audio, Language, Game State)

### Backend
*   **Python** (Flask/FastAPI)
*   **Docker** & **Docker Compose** for containerization

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Python 3.10+ (for backend)
*   Docker (optional, for full stack deployment)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/nicolabalzano/CyberShield-Command.git
    cd CyberShield-Command
    ```

2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The game will likely run at `http://localhost:5173`.

3.  **Backend Setup (Optional)**
    ```bash
    cd backend
    pip install -r requirements.txt
    python app.py
    ```

4.  **Run with Docker**
    ```bash
    docker-compose up --build
    ```