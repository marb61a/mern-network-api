exports.createPostValidator = (req, res, next) => {
  // Title
  req.check("title", "Create a title").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters")
    .isLength({ min: 4, max: 150});
  
  // Body
  req.check("body", "Create a body").notEmpty();
  req.check("body", "The body must be between 4 to 150 characters")
    .isLength({ min: 4, max: 2000});
  
  // Error Checking
  const errors = req.validationErrors();
  // If there are errors show them starting with the first
  if(errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ 
      error: firstError 
    });
  }

  // Proceed to next middleware
  next();
}

exports.userSignupValidator = (req, res, next) => {
  // Check name is not null and is between 4 and 10 characters
  req.check("name", "Name is required").notEmpty();

  // Check that the email address is not null, is valid and is normalised
  req.check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email address must contain @")
    .isLength({
      min: 4,
      max: 2000
    });
    
    // Check for password & check password
    req.check("password", "Password is required").notEmpty();
    req.check("password")
      .isLength({min: 6})
      .withMessage("Password must contain at least 6 characters")
      .matches(/\d/)
      .withMessage("Password must contain a number");

    // Error Checking
    const errors = req.validationErrors();
    // If there are errors show them starting with the first
    if(errors) {
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).json({ 
        error: firstError 
      });
    }

    // Proceed to next middleware
    next();
};