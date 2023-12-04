

function clearMsg() {
    errors = document.getElementsByClassName('formerror');
    for (let items of errors) {
        items.innerHTML = "";
    }
}

function setErrorMsg(id, error){
    ele = document.getElementById(id);
    ele.document.getElementsByClassName('formerror')[0].innerHTML = error;
}


function formValidation(){
    let state = true;
    clearMsg();

    let name = document.forms['reg-form']['fusername'].value;
    if (name.length == 0 || name.length < 6) {
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
    if (pass.length < 3) {
        setErrorMsg("password", "too short password");
        state = false;
    }

    let confirmPass = document.forms['reg-form']['fconfirm-password'].value;
    if (confirmPass != pass) {
        setErrorMsg("confirm-password", "Password not matched!");
        state = false;
    }

    return state;
}