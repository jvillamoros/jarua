import { authenticate } from 'passport';

function authMiddleware(req, res, next) {
  authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  })(req, res, next);
}

export default authMiddleware;
