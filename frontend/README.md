# Forumapplikation

En enkel forumapplikation där användare kan skapa diskussionstrådar och svara på befintliga trådar.

## Funktioner

- Visa lista över alla diskussionstrådar
- Klicka på en tråd för att se dess innehåll och svar
- Skapa nya diskussionstrådar
- Svara på befintliga trådar

## Installation

### Förutsättningar

- Node.js (v14 eller senare)
- npm (v6 eller senare)

### Steg för att installera

1. Klona detta repository
2. Installera backend-beroenden:

d backend
npm install
Copy3. Installera frontend-beroenden:
cd frontend
npm install
Copy

## Starta applikationen

### Starta backend-servern

cd backend
npm start
Copy
Backend-servern kommer att köras på http://localhost:3000

### Starta frontend-utvecklingsservern

cd frontend
npm run dev
Copy
Frontend-servern kommer att köras på http://localhost:5173

## Teknologier

- **Frontend**: React, React Router, Context API
- **Backend**: Express.js
- **Databas**: SQLite
- **Integrering**: Better-sqlite3
