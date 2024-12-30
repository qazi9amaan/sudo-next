Secure, Modular, and Scalable Authentication System
This repository contains the implementation of a secure, modular, and scalable authentication system designed to work seamlessly with Next.js (client and server) and Express.js. The system focuses on:

Authentication: Validating user credentials (e.g., via OTP) and generating secure session tokens.
Session Management: Centralized session storage using Redis with token-based stateless validation for Next.js and Redis-backed validation for Express.js.
Cookie Handling: Securely setting, updating, and deleting cookies containing session metadata and tokens.
Authorization: access control and session cookie validation.

Design Overview
Adapter: Acts as the source of truth for session data. Backend systems validate and update session data stored via adapter.
iron-session: Handles encrypted cookies for Next.js, providing session data directly from cookies for efficient client-side validation.
Integration: Synchronization between session cookies (iron-session) and Adapter ensures up-to-date data for every client and backend request.

System Flow

1. Login Flow:
   User logs in → Session is created via adapter → Encrypted session token is set in a cookie using iron-session.
2. Request Validation:
   Next.js Middleware: Decrypts and validates the session cookie directly.
   Express Middleware: Decrypts the session cookie and cross-validates it with Adapter.

3. Session Update Flow:
   When session data changes, Adapter updates the session.
   Updated session data is synchronized with the client cookie via iron-session.

4. Logout Flow:
   Session is deleted via Adapter.
   The session cookie is cleared via iron-session.
