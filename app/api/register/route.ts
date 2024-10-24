import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

// This file defines the API route handler for user registration.
// It's part of Next.js API Routes, specifically for the /api/register endpoint.

export async function POST(request: NextRequest) {
    // Handle POST requests for user registration
    
    // Parse the JSON body from the request
    const body = await request.json();
    
    // Destructure the required fields from the request body
    const { name, email, password } = body;

    // Hash the password for secure storage
    // The second argument (12) is the salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user in the database using Prisma
    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
        },
    });

    // Return the created user as a JSON response
    return NextResponse.json(user);
}

// Explanation:
// 1. This file handles the POST request for user registration.
// 2. It uses the Next.js App Router API format (route.ts).
// 3. The POST function is an async handler for registration requests.
// 4. It extracts name, email, and password from the request body.
// 5. The password is hashed using bcrypt for security (with 12 salt rounds).
// 6. A new user is created in the database using Prisma ORM.
// 7. The created user object is returned as a JSON response.

// Security Considerations:
// - Password hashing is implemented to protect user credentials.
// - Using Prisma for database operations helps prevent SQL injection.

// Potential Improvements:
// - Input validation: Ensure email format, password strength, etc.
// - Error handling: Catch and handle potential errors (e.g., duplicate email).
// - Email verification: Implement a process to verify user emails.
// - Rate limiting: Prevent abuse by limiting registration attempts.
// - Sanitization: Sanitize inputs to prevent XSS attacks.

// Usage:
// - This endpoint is called when a new user submits a registration form.
// - It should be used in conjunction with client-side validation.
// - The frontend should handle the response appropriately (success/error).

// Note:
// - This implementation assumes the Prisma schema has a User model with name, email, and hashedPassword fields.
// - Make sure to handle the response securely on the client side, not exposing sensitive information.
