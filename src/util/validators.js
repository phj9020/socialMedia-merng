
export const validateRegisterInput = (username, password, confirmPassword, email) => {
    const errors = {};
    if(username.trim() === '') {
        errors.username = "Username must not be empty"
    }

    if(email.trim() === '') {
        errors.email = "email must not be empty"
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.match(regEx)) {
            errors.email = "Email must be a valid email address";
        }
    }

    if(password.trim() === '') {
        errors.password = "password must not be empty"
    } else if(password !== confirmPassword) {
        errors.confirmPassword = "password must match"
    }

    return { 
        errors,
        // object errors key length < 1 = no error  valid: true;
        valid: Object.keys(errors).length < 1
    }
}

export const validateLoginInput = (email, password) => {
    const errors = {};
    if(email.trim("") === '') {
        errors.email = "email must not be empty"
    }
    if(password.trim("") === '') {
        errors.password = "password must not be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}