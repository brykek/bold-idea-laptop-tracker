const errors = {
    INVALID_PARAMETERS: 'Invalid parameters in request.',
    ALPHANUMERIC_ONLY: 'Parameters must be alphanumeric only.',
    PASSWORD_COMPLEXITY: 'Passwords must be at least 8 characters long and contain 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special character.',
    INVALID_OPERATION: 'Operation could not be performed.',
    USER_CHANGES_FAIL: 'Unable to apply changes to user.',
    INVALID_LOGIN: 'Incorrect username and/or password.',
    USER_EXISTS: 'User already exists.'
}

module.exports = errors;
