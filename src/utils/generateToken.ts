const jwt = require('jsonwebtoken');

interface JwtPayload {
  userId: string;
}

/**
 * Generates a JWT token with the given payload and secret.
 * @param {string} payload - The payload to include in the token.
 * @param {string} secret - The secret key to sign the token.
 * @returns {string} The generated JWT token.
 */
export function generateToken(payload: object, secret: string): string {
    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_EXPIRATION || '1h' });
}

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {string} token - The JWT token to verify.
 * @param {string} secret - The secret key used to sign the token.
 * @returns {JwtPayload} The decoded payload if the token is valid.
 * @throws {Error} If the token is invalid or expired.
 */
export function verifyToken(token: string, secret: string): JwtPayload {
    try {
        return jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}
/**
 * Generates a refresh token with the given payload and secret.
 * @param {Object} payload - The payload to include in the refresh token.
 * @param {string} secret - The secret key to sign the refresh token.
 * @returns {string} The generated refresh token.
 */
export function generateRefreshToken(payload: object, secret: string): string {
    return jwt.sign(payload, secret, { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d' });
}
