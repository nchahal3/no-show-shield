module.exports = {
  reactStrictMode: true,
  env: {
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  images: {
    domains: ['your-image-domain.com'], // Replace with your image domain if needed
  },
};