export const validatePhone = (inputValue) => {
    let errorMessage = null;
    if (!inputValue) {
        errorMessage = "Phone number is required";
    } else if (
        !/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
            inputValue
        )
    ) {
        errorMessage = "Phone number is not valid";
    }
    return errorMessage;
}

export const validateName = (inputValue) => {
    let errorMessage = null;
    if (!inputValue) {
        errorMessage = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(inputValue)) {
        errorMessage = "Name is not valid";
    }
    return errorMessage;
}

export const validateEmail = (inputValue) => {
    let errorMessage = null;
    if (!inputValue) {
        errorMessage = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
        errorMessage = "Invalid email address";
    }
    return errorMessage;
}
