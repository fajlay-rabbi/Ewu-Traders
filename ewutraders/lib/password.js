
const emailRegex = /^\d{4}-\d-\d{2}-\d{3}@std\.ewubd\.edu$/;

exports.validateEmail = (email) => {
    return emailRegex.test(email);
}
