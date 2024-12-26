# GlamChats - Instagram Automation Platform

GlamChats is a powerful Instagram automation platform built with modern web technologies that enables users to create automated responses to Instagram messages and comments using AI.

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Redux + React Query
- **Payments**: Stripe
- **AI Integration**: OpenAI
- **API Testing**: Ngrok for webhook testing

## Application Flow

1. Users sign up/login using Clerk authentication
2. Connect their Instagram account through OAuth
3. Create automations with triggers and listeners
4. Set up AI-powered responses or custom message templates
5. Monitor automation performance through the dashboard

## Database Schema

The application uses a PostgreSQL database with the following main models:

- **User**: Stores user information and links to Clerk authentication
- **Subscription**: Handles user subscription status (Free/Pro)
- **Integrations**: Manages Instagram account connections
- **Automation**: Core model for user's automation rules
- **Listener**: Configures how automations respond to triggers
- **Post**: Tracks Instagram posts for automation
- **Trigger**: Defines automation activation conditions
- **Keyword**: Manages trigger keywords for automations

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- Instagram Developer Account
- Clerk Account
- Stripe Account
- OpenAI API Key
- Ngrok for local development

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Clerk Redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

# Stripe
STRIPE_SUBSCRIPTION_PRICE_ID=your_price_id
STRIPE_CLIENT_SECRET=your_secret_key

# Instagram
INSTAGRAM_BASE_URL=https://graph.instagram.com
INSTAGRAM_EMBEDDED_OAUTH_URL=your_oauth_url
INSTAGRAM_CLIENT_ID=your_client_id
INSTAGRAM_CLIENT_SECRET=your_client_secret
INSTAGRAM_TOKEN_URL=https://api.instagram.com/oauth/access_token

# OpenAI
OPEN_AI_KEY=your_openai_key

# Development
NEXT_PUBLIC_HOST_URL=http://localhost:3000
NEXT_PUBLIC_NGROK_URL=your_ngrok_url
```

### Database Setup

1. Get your database URL from Neon.tech:
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Get your connection string from the dashboard
   - Replace the DATABASE_URL in your .env file

2. Run Prisma migrations:
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed database (if needed)
npx prisma db seed
```

### Ngrok Setup for Webhook Testing

1. Install ngrok:
```bash
npm install -g ngrok
```

2. Start ngrok:
```bash
ngrok http 3000
```

3. Copy the HTTPS URL provided by ngrok and add it to your .env file as NEXT_PUBLIC_NGROK_URL

### Running the Application

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Features

- OAuth-based Instagram account connection
- Automated response system for DMs and comments
- AI-powered message generation using OpenAI
- Custom trigger keywords and conditions
- Message template system
- Analytics dashboard
- Subscription-based access levels (Free/Pro)
- Webhook integration for real-time updates
