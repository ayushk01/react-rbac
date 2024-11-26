export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

export const validateUser = (userData) => {
  const errors = {};

  if (!userData.username) {
    errors.username = "Username is required";
  } else if (!validateUsername(userData.username)) {
    errors.username = "Invalid username format";
  }

  if (!userData.email) {
    errors.email = "Email is required";
  } else if (!validateEmail(userData.email)) {
    errors.email = "Invalid email format";
  }

  if (!userData.role) {
    errors.role = "Role is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
