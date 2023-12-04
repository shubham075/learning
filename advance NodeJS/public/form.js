
// let Name = document.forms['reg-form']['fname'].value;
// let contact = document.forms['reg-form']['fcontact'].value;
// let email = document.forms['reg-form']['femail'].value;

let data = {}
function clearMsg() {
    errors = document.getElementsByClassName('formerror');
    for (let items of errors) {
        items.innerHTML = "";
    }
}

function setErrorMsg(id, error) {
    ele = document.getElementById(id);
    ele.getElementsByClassName('formerror')[0].innerHTML = error;
}

function formValidation() {
    let state = true;
    clearMsg();
    // let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let Name = document.forms['reg-form']['fname'].value;
    if (Name.length == 0 || Name.length < 6) {
        setErrorMsg("name", "input data is not valid!");
        state = false;
    }

    let contact = document.forms['reg-form']['fcontact'].value;
    if (isNaN(contact) || contact.length != 10) {
        setErrorMsg("contact", "invalid contact number!");
        state = false;
    }

    let email = document.forms['reg-form']['femail'].value;
    if (email.length < 10) {
        setErrorMsg("email", "Email id is too short!");
        state = false;
    }


    let pass = document.forms['reg-form']['fpassword'].value;
    if (pass.length < 6) {
        setErrorMsg("password", "too short or worng password!");
        state = false;
    }

    let confirmPass = document.forms['reg-form']['fconfirm-password'].value;
    if (confirmPass != pass) {
        setErrorMsg("confirm-password", "Password not matched!");
        state = false;
    }

    return state;
}

// function getData() {
//     data = {
//         "email":document.forms['reg-form']['femail'].value ,
//         "phone":document.forms['reg-form']['fcontact'].value 
//     }
//     const strJson = JSON.stringify(data);
//     if (formValidation() == true) {
//         localStorage.setItem(`${Name} --info`, strJson);
//     }
//     console.log(strJson);
// }
