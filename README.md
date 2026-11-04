
# Neo Saloon Admin

An admin dashboard for managing a salon business, built with **Next.js**. It gives salon owners and staff one place to manage appointments, customers, services, staff, and day-to-day operations.

> **Status:** Active development

---

## Features

- **Dashboard overview**: key metrics at a glance (bookings, revenue, new customers)
- **Appointment management**: view, create, reschedule, and cancel bookings
- **Customer management**: customer profiles, contact details, and visit history
- **Services & pricing**: add, edit, and organize salon services and categories
- **Staff management**: staff profiles, roles, and schedules
- **Authentication & role-based access**: secure login with admin and staff roles
- **Responsive UI**: works on desktop, tablet, and mobile
- **Light/dark mode** support

> Adjust this list to match what is actually implemented in your build.

---

## Tech Stack

| Layer          | Technology                              |
| -------------- | --------------------------------------- |
| Framework      | [Next.js](https://nextjs.org/) (App Router) |
| Language       | TypeScript                              |
| Styling        | Tailwind CSS                            |
| UI Components  | shadcn/ui                               |
| Database       | PostgreSQL                              |
| Auth           | NextAuth.js / JWT                       |
| Deployment     | Vercel                                  |

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A running PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/neo-saloon-admin-fixed.git
cd neo-saloon-admin-fixed

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/neo_saloon"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret"

# Optional: file storage, payments, etc.
# AWS_S3_BUCKET=
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
```

### Database Setup

```bash
# Run migrations (adjust to your ORM, e.g. Prisma or Drizzle)
npx prisma migrate dev

# Optional: seed sample data
npx prisma db seed
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create an optimized production build |
| `npm run start`   | Run the production build             |
| `npm run lint`    | Run ESLint                           |

---

## Project Structure

```
neo-saloon-admin-fixed/
├── app/                # Next.js App Router pages and layouts
│   ├── (auth)/         # Login and authentication pages
│   ├── dashboard/      # Dashboard and admin modules
│   └── api/            # API route handlers
├── components/         # Reusable UI components
├── lib/                # Utilities, helpers, DB client
├── hooks/              # Custom React hooks
├── types/              # Shared TypeScript types
├── public/             # Static assets
└── prisma/             # Database schema and migrations (if used)
```

> Update this tree to reflect your actual folder layout.

---

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com/):

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables from `.env.local`.
4. Deploy.

For other platforms, run `npm run build` followed by `npm run start`.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
