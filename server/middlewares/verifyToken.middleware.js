const JWT_SECRET = process.env.JWT_SECRET;

module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        req.user = decoded;
        next();
    });
}