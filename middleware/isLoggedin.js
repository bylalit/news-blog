const jwt = require('jsonwebtoken');

const isLoggedin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.redirect('/admin/');

        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(tokenData);
        req.id = tokenData.id;
        req.role = tokenData.role;
        req.fullname = tokenData.fullname;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
};

module.exports = isLoggedin;
