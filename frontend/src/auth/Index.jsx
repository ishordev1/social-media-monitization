
// CheckIsLogin
export const isLoggedIn = () => {
    if (localStorage.length === 0) {
        return false
    }
    let data = localStorage.getItem("data")
    if (data === null) {
        return false
    }
    else {
        return true
    }
};

// doLogin=> data=> set to localStorage
export const doLogin = (data, next) => {
    console.log(data)
    localStorage.setItem("data", JSON.stringify(data))
    next()
};


// doLogout
export const doLogout = (next) => {
    localStorage.removeItem("data")
    next()
};


//get current user
export const getCurrentUserDetails = () => {
    if (isLoggedIn()) {
        //return karna hai user ka name jo jwt ke saath hai
        return JSON.parse(localStorage.getItem("data")).user;
    }
    else return undefined;
};


//check admin
export const isAdmin = () => {
    if (isLoggedIn()) {
        const tokenData = JSON.parse(localStorage.getItem('data'))
        const role = tokenData.user.role;
        if (role === "ADMIN") {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

//check user
export const isCustomer = () => {
    if (isLoggedIn()) {
        const tokenData = JSON.parse(localStorage.getItem('data'))
        const role = tokenData.user.role;
        if (role === "CUSTOMER") {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
//check user
export const isBrand = () => {
    if (isLoggedIn()) {
        const tokenData = JSON.parse(localStorage.getItem('data'))
        const role = tokenData.user.role;
        if (role === "BRAND") {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export const getToken = () => {
    if (isLoggedIn()) {
        const data = JSON.parse(localStorage.getItem('data'));
        return data.token;
    } else {
        return null;
    }
}