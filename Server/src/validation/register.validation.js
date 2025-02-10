import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 3 characters long.',
    'string.max': 'Name must be less than 50 characters.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'string.max': 'Password must be less than 20 characters.',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match.',
      'string.empty': 'Confirm Password is required.',
    }),
  role: Joi.string().valid('customer', 'admin').optional(),
});

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const formattedErrors = error.details.reduce((acc, err) => {
      acc[err.path[0]] = err.message;
      return acc;
    }, {});

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: formattedErrors,
    });
  }

  next();
};
