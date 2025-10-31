# Prompinsta

A community-driven platform for sharing, discovering, and managing AI prompts.

**Live** :

## Quick Start

### Prerequisites

- Node.js 18+
- Mongo Atlas
- Bun

### Setup

1. **Clone & Install**

   ```bash
   git clone <repo-url>
   cd prompinsta
   bun install
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env
   # Fill in your credentials
   ```

3. **Setup Database**

   ```bash
   bunx prisma migrate dev
   ```

4. **Run Dev Server**
   ```bash
   bun run dev
   ```

Visit `http://localhost:3000`
