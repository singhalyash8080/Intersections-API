const { hardcodedAuthToken } = require('../../constants/auth')

/**
 * @summary Middleware to check authentication headers
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function.
 * @returns {void}
 */
const authenticate = (req, res, next) => {
    // Get the authentication headers
    const authHeader = req.headers.authorization;

    // Check if the authentication headers are present and valid
    if (authHeader && authHeader === hardcodedAuthToken) {
        // Authentication passed, proceed to the next middleware or route handler
        next();
    } else {
        // Authentication failed, send a 401 Unauthorized response
        res.sendStatus(401);
    }
};

module.exports = authenticate