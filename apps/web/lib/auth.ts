import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.API_URL,
  trustedOrigins: [process.env.BASE_URL!],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // send email using nodemailer or service
    },
  },
  cookies: {
    sessionToken: {
      attributes: {
        httpOnly: true,
        sameSite: "lax", // or "none" if cross-site
        secure: false, // true in production (https)
      },
    },
  },
});
