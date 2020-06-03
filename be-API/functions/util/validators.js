const isEmpty = (string) => {
  //   if (string.trim() === "") return true;
  //   else return false;

  return string.trim() === "" ? true : false;
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // return email.match(emailRegEx) ? true : false;
  return email.match(emailRegEx);
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be valid email address";
  }

  if (isEmpty(data.firstName)) {
    errors.firstName = "Must not be empty";
  }
  if (isEmpty(data.lastName)) {
    errors.lastName = "Must not be empty";
  }
  if (isEmpty(data.username)) {
    errors.username = "Must not be empty";
  }

  if (isEmpty(data.password)) {
    errors.password = "Must not be empty";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Password must be the same";
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
