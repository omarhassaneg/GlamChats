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

- Node.js 18+ and yarn
- PostgreSQL database
- Instagram Developer Account
- Clerk Account
- Stripe Account
- OpenAI API Key
- Ngrok for local development

### Installation Steps

1. Clone the repository and install dependencies:
```bash
yarn install --legacy-peer-deps
```

2. Install Clerk:
```bash
yarn add @clerk/nextjs --legacy-peer-deps
```

3. Get your database URL from Neon.tech:
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Get your connection string from the dashboard

4. Set up environment variables by creating a `.env` file with the following:

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

5. Set up the database:
```bash
# Generate Prisma client
yarn prisma generate

# Run migrations
yarn prisma migrate dev

# Seed database (if needed)
yarn prisma db seed
```

6. Start the development server:
```bash
yarn dev
```

7. In a new terminal, set up Ngrok for webhook testing:
```bash
# Install ngrok globally
yarn global add ngrok

# Start ngrok (replace 3000 with your local development server port)
ngrok http http://localhost:3000
```

8. Copy the HTTPS URL provided by ngrok and update it in your .env file as NEXT_PUBLIC_NGROK_URL

9. Open [http://localhost:3000](http://localhost:3000) in your browser

## Production Deployment

1. Build the application:
```bash
yarn build
```

2. Start the production server:
```bash
yarn start
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
