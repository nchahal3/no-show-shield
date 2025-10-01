# No-Show Shield

No-Show Shield is a SaaS application designed to help local businesses (salons, gyms, clinics, restaurants) reduce no-shows by implementing a booking system that requires deposits, sends smart reminders, and provides business owners with an analytics dashboard.

## Features

1. **Booking Flow**:
   - Customers can book appointments and pay a small deposit via Stripe Checkout.
   - Successful payments confirm the booking in the database.
   - Booking status updates for cancellations or no-shows.

2. **Reminder Service**:
   - A scheduled job runs daily to send SMS and email reminders for bookings in the next 24 hours.
   - Includes a "reschedule" link that updates the booking in the database.

3. **Business Dashboard**:
   - Business owners can log in to view upcoming bookings, deposits collected, and no-shows.
   - Displays a simple chart showing the percentage of revenue saved by deposits.

4. **Monetization**:
   - Offers Stripe subscription plans ($49/mo starter, $99/mo pro).
   - Auto-billing for businesses.

## Tech Stack

- **Frontend**: Next.js + Tailwind (TypeScript)
- **Backend**: NestJS (TypeScript)
- **Database**: PostgreSQL (via Prisma ORM)
- **Messaging**: Twilio (SMS) + Resend (Email)
- **Payments**: Stripe (for deposits + subscriptions)
- **Auth**: JWT-based authentication for business owners

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js and npm installed for local development.

### Setup Instructions

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/no-show-shield.git
   cd no-show-shield
   ```

2. **Create a `.env` file**:
   - Copy the example environment files:
     ```
     cp frontend/.env.example frontend/.env
     cp backend/.env.example backend/.env
     ```
   - Fill in the required API keys and database connection details in the `.env` files.

3. **Install dependencies**:
   - For the frontend:
     ```
     cd frontend
     npm install
     ```
   - For the backend:
     ```
     cd ../backend
     npm install
     ```

4. **Run the application**:
   - From the root of the project, run:
     ```
     docker-compose up
     ```
   - This command will start the PostgreSQL database, backend, and frontend services.

5. **Seed the database** (optional):
   - To populate the database with dummy data, run the seed script:
     ```
     cd backend
     ts-node seed.ts
     ```

## Usage

- Access the frontend application at `http://localhost:3000`.
- Access the backend API at `http://localhost:3001`.

## License

This project is licensed under the MIT License. See the LICENSE file for details.