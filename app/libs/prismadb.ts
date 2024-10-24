import { PrismaClient } from "@prisma/client";

// This file creates and manages a single instance of PrismaClient for the entire application.
// It's designed to work efficiently in both development and production environments.

// Declare a global type for prisma to avoid TypeScript errors
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

// Create a new PrismaClient instance if it doesn't already exist
const client = globalThis.prisma || new PrismaClient();

// In development, save the PrismaClient instance to the global object
// This prevents creating multiple instances during hot reloading
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

// Export the PrismaClient instance for use in other parts of the application
export default client;

// Explanation:
// 1. This file ensures that only one instance of PrismaClient is created and reused across the application.
// 2. The global declaration allows TypeScript to recognize the global prisma variable without errors.
// 3. The client is created only if it doesn't exist in the global scope, preventing multiple instances.
// 4. In development, the client is attached to the global object to persist across hot reloads.
// 5. In production, a new client is created for each serverless function invocation, ensuring proper connection management.
// 6. The client is exported for use in other parts of the application, providing a centralized database access point.

// Usage:
// - Import this client in other files to interact with the database:
//   import prisma from '@/app/libs/prismadb'
// - Use it to perform database operations, e.g.:
//   const users = await prisma.user.findMany()

// Benefits:
// - Prevents connection issues in development due to too many PrismaClient instances.
// - Ensures efficient database connections in both development and production environments.
// - Centralizes database client management, making it easier to maintain and update.

// Note:
// - This pattern is particularly useful for Next.js applications, which may have frequent hot reloads in development.
// - It's important to properly manage database connections, especially in serverless environments.
