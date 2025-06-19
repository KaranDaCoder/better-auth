import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import { db } from './db';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: process.env.GUTHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({email, otp}) {
      await resend.emails.send({
          from: 'KaranKhot_BetterAuth <onboarding@resend.dev>',
          to: [email],
          subject: 'Hello world',
          html: `<p>Your OTP is <strong>${otp}<strong><p>`
          // react: EmailTemplate({ firstName: 'John' }),
        });
      },
      allowedAttempts : 5
    })
  ]
});
