const { body } = require('express-validator')

const loginValidation = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^\S+$/)
        .withMessage('Username must not contain spaces')  
        .isLength({ min: 5, max: 10 })
        .withMessage('Username must be between 5 and 10 characters'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5, max: 12 })
        .withMessage('Password must be between 5 and 12 characters')
]


const userValidation = [
    body('fullname')
        .trim()
        .notEmpty()
        .withMessage('Fullname is required')
        .isLength({ min: 5, max: 20 })
        .withMessage('Fullname must be between 5 and 20 characters'),
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .matches(/^\S+$/)
        .withMessage('Username must not contain spaces')  
        .isLength({ min: 5, max: 12 })
        .withMessage('Username must be between 5 and 12 characters'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 5, max: 12 })
        .withMessage('Password must be between 5 and 12 characters'),
    body('role')
        .trim()
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['author', 'admin'])
        .withMessage('Role must be author or admin')
]


const userUpdateValidation = [
     body('fullname')
        .trim()
        .notEmpty()
        .withMessage('Fullname is required')
        .isLength({ min: 5, max: 20 })
        .withMessage('Fullname must be between 5 and 20 characters'),
    body('password')
        .optional({ checkFalsy: true })
        .isLength({ min: 5, max: 12 })
        .withMessage('Password must be between 5 and 12 characters'),
    body('role')
        .trim()
        .notEmpty()
        .withMessage('Role is required')
        .isIn(['author', 'admin'])
        .withMessage('Role must be author or admin')
]


const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 12 })
        .withMessage('Category name must be between 3 and 12 characters'),
    body('description')
        .optional({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage('Description must be less than 100 characters')
]


const articleValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5, max: 100 })
        .withMessage('Title must be between 5 and 100 characters'),
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Content is required')
        .isLength({ max: 1500 })
        .withMessage('Content must be at least 1500 characters'),
    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required')
]



module.exports = { loginValidation, 
                    userValidation, 
                    userUpdateValidation, 
                    categoryValidation, 
                    articleValidation 
                }