# andyhay.com — Personal Portfolio

A sleek, responsive personal portfolio website showcasing projects, experience, and contact forms, designed with a modern terminal/developer console aesthetic.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v16.2 with App Router)
- **Library:** [React](https://react.dev/) (v19)
- **Styling:** Custom CSS Modules with terminal-inspired styling and glassmorphism elements
- **Form Handling:** reCAPTCHA-protected contact mailer via [Nodemailer](https://nodemailer.com/)
- **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
- **CI/CD:** GitHub Actions CI & Vercel Native Deployment

---

## 🛠️ Key Features

- **Project Filter System:** A custom console-style filter interface allowing users to filter projects by repository types (e.g., `web`, `esp32`, `library`).
- **Interactive Experience Timeline:** Dynamic visualization of professional experience.
- **SMTP-backed Contact Page:** Secure message delivery to the inbox backed by reCAPTCHA v2 to protect against spam.
- **CI Pipeline:** Automated build checks and ESLint verification on every pull request and push to the `main` branch.

---

## 💻 Local Development

### 1. Prerequisites
Ensure you have **Node.js 20+** installed on your system.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory by copying the `.env.example` file and filling in the values:
```bash
cp .env.example .env.local
```

Configure the following environment keys:
```ini
# reCAPTCHA Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY_DEV=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY_DEV=your_recaptcha_secret_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY_PROD=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY_PROD=your_recaptcha_secret_key

# Email SMTP Setup (for the contact form mailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_AUTH=true
SMTP_SECURE=true
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM_EMAIL=your-sender-email
SMTP_FROM_NAME="Andy Hay Portfolio"
ADMIN_EMAIL=your-destination-email
```

### 4. Running the Dev Server
Start the development server with:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 🧪 Testing and Linting

- **Run unit tests (Vitest):**
  ```bash
  npm run test
  ```
- **Run lint checks (ESLint):**
  ```bash
  npm run lint
  ```
- **Perform local production build:**
  ```bash
  npm run build
  ```

---

## 🌐 Deployment

This project is optimized for deployment on the **Vercel** platform.

### Vercel Native GitHub Integration (Recommended)
1. Go to your [Vercel Dashboard](https://vercel.com) and click **Add New > Project**.
2. Import your GitHub repository.
3. Configure the environment variables in Vercel to match your production keys.
4. Click **Deploy**. Vercel will automatically deploy any subsequent pushes to the `main` branch, as well as preview builds for open Pull Requests.

### CI Gates (GitHub Actions)
A CI workflow is defined in [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml). It triggers automatically on pull requests and pushes to `main`.
- It installs dependencies (`npm ci`), runs the linter (`npm run lint`), and verifies that the production build completes (`npm run build`) before changes are merged.
