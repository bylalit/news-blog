const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const minifyHTML = require('express-minify-html-terser')
const flash = require('connect-flash');
const compression = require('compression')
require('dotenv').config();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(compression({
    level: 9,
    threshold: 10 * 1024
}));

app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}))


// view engine setup
app.set('view engine', 'ejs');

// Database connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});

// Routes

app.use("/admin", (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
})

app.use('/admin', require('./routes/admin'));

app.use('/', require('./routes/frontend'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
