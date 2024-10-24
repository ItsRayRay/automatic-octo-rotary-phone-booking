// This file configures NextAuth for authentication in the application.
// It sets up various authentication providers and options.

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export const authOptions: NextAuthOptions = {
    // Use PrismaAdapter to integrate NextAuth with your Prisma database
    adapter: PrismaAdapter(prisma),

    // Configure authentication providers
    providers: [

        //TODO: other providers if needed
        // Google OAuth provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        // Credentials provider for email/password login
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                // Validate credentials
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                // Find user in the database
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // Check if user exists and has a password
                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials");
                }

                // Compare provided password with stored hashed password
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                // Return user if authentication is successful
                return user;
            },
        }),
    ],

    // Specify custom pages
    pages: {
        signIn: "/",
    },

    // Enable debug messages in development
    debug: process.env.NODE_ENV === "development",

    // Configure session handling
    session: {
        strategy: "jwt",
    },

    // Set the secret for encrypting tokens
    secret: process.env.NEXTAUTH_SECRET,
};

// Export the configured NextAuth function
export default NextAuth(authOptions);
