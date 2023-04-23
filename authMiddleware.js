"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
// Middleware de autenticação
function authMiddleware(req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autenticação ausente ou inválido' });
    }
    const token = req.headers.authorization.slice(7);
    const secret = process.env.JWT_SECRET || "";
    const decodedToken = (0, jsonwebtoken_1.verify)(token, secret);
    req.user = decodedToken;
    next();
}
exports.authMiddleware = authMiddleware;
