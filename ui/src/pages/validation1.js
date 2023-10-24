function validation1(values) {

    let error = {}
    const email_Pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_Pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.uname === "") {
        error.uname = "Uname is required";
    } else {
        error.uname = "";
    }


    if (values.email === "") {
        error.email = "Email is required";
    } else if (!email_Pattern.test(values.email)) {
        error.email = "Please provide a valid email address";
    } else {
        error.email = "";
    }


    if (values.password === "") {
        error.password = "Password is required";
    } else if (!password_Pattern.test(values.password)) {
        error.password = "Password must contain at least 8 characters, including numbers, uppercase, and lowercase letters";
    } else {
        error.password = "";
    }

    return error;
}


export default validation1;