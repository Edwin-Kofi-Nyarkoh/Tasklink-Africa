# TaskLink Africa

A comprehensive platform connecting verified skilled professionals with customers across Africa.

## Features

- 🔍 **Worker Discovery**: Search and filter professionals by service, location, and ratings
- 📅 **Booking System**: Easy booking with secure payment integration
- 💬 **Real-time Chat**: Communication between customers and workers
- 🎫 **QR Code Tickets**: Verification system for both parties
- 📱 **Responsive Design**: Works perfectly on all devices
- 🌙 **Dark Mode**: Full dark mode support
- 🔐 **Authentication**: Secure login with NextAuth
- 💳 **Payments**: Integrated with Paystack for secure transactions
- 📧 **Notifications**: Email and SMS notifications
- ⭐ **Reviews**: Rating and review system

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query + Axios
- **Payments**: Paystack
- **Email**: Nodemailer
- **SMS**: Hellosend
- **Image Upload**: Cloudinary
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/tasklink-africa.git
   cd tasklink-africa
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Fill in your environment variables in `.env.local`

4. **Set up the database**
   \`\`\`bash
   # Generate Prisma client
   pnpm db:generate
   
   # Push database schema
   pnpm db:push
   
   # (Optional) Seed the database
   pnpm db:seed
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:push` - Push schema changes to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:seed` - Seed the database

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tasklink_africa"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Paystack
PAYSTACK_PUBLIC_KEY="pk_test_your-paystack-public-key"
PAYSTACK_SECRET_KEY="sk_test_your-paystack-secret-key"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="TaskLink Africa <noreply@tasklinkafrica.com>"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Hellosend SMS
HELLOSEND_API_KEY="your-hellosend-api-key"
\`\`\`

## Project Structure

\`\`\`
tasklink-africa/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── workers/           # Worker-related pages
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── landing/          # Landing page components
│   ├── workers/          # Worker components
│   └── ...
├── lib/                  # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
\`\`\`

## API Endpoints

- `GET /api/workers` - Get all workers with filters
- `GET /api/workers/[id]` - Get specific worker
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `POST /api/messages` - Send message
- `GET /api/messages` - Get messages
- `POST /api/payment/initialize` - Initialize payment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
