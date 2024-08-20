const form = document.querySelector('form');
const re = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

class Field {
    constructor(field, error) {
        this.field = field;
        this.error = error;
    }
    isValid() {
        this.error.textContent = "";
        this.error.className = "error";
    }
}

class Email extends Field {
    constructor(field, error) {
        super(field, error);
    }
    showError() {
        if (this.field.validity.valueMissing) {
            this.error.textContent = "Expected email; Found nothing";
        } 
        if (this.field.validity.typeMismatch) {
            this.error.textContent = "Invalid Email";
        }
        if (this.field.validity.tooShort) {
            this.error.textContent = "Invalid email: too short";
        } 
    }
}
class Country extends Field {
    constructor(field, error) {
        super(field, error);
    }
    showError() {
        if (this.field.validity.valueMissing) {
            this.error.textContent = "Expected country; Found nothing";
        }
        if (this.field.validity.tooShort) {
            this.error.textContent = "Invalid country: too short";
        }
    }
}

class Postal extends Field {
    constructor(field, error) {
        super(field, error);
    }
    showError() {
        if (this.field.validity.valueMissing) {
            this.error.textContent = "Expected postal code; Found nothing";
        }
    }
}


// Password confirmation is going to be the death of me.
class Pass extends Field {
    constructor(field, error) {
        super(field, error);
        this.valid = false;
    }
    showError() {
        if (!this.field.validity.valid) {
            this.error.textContent = "Invalid password";
        }
        if (this.field.validity.valueMissing) {
            this.error.textContent = "Expected Password; Found nothing";
        }
        if (this.field.validity.tooShort) {
            this.error.textContent = "Password too short. Min length: 8";
        }
        if (this.field.validity.tooLong) {
            this.error.textContent = "Password too long. Max length: 15 chars";
        }
    }
}

class PassConfirm extends Field {
    constructor(field, error) {
        super(field, error);
        this.valid = false;

    }
    showError() {
        if (!this.field.validity.valid) {
            this.error.textContent = "Invalid password";
        }
        if (this.field.validity.valueMissing) {
            this.error.textContent = "Expected Password; Found nothing";
        }
        if (this.field.validity.tooShort) {
            this.error.textContent = "Password too short. Min length: 8";
        }
        if (this.field.validity.tooLong) {
            this.error.textContent = "Password too long. Max length: 15 chars";
        }
    }
}

const email = new Email(
    document.getElementById('email'), 
    document.querySelector('#email + span.error')
);
const country = new Country(
    document.getElementById('country'),
    document.querySelector('#country + span.error')
);
const postal = new Postal(
    document.getElementById('postal'),
    document.querySelector('#postal + span.error')
);
const pass = new Pass(
    document.getElementById('pass'),
    document.querySelector('#pass + span.error')
);
const passConfirm = new PassConfirm(
    document.getElementById('pass-confirm'),
    document.querySelector('#pass-confirm + span.error')
);

const passFields = [
    pass,
    passConfirm
]

email.field.addEventListener('input', () => {
    if (!email.field.validity.valid) {
        email.showError();
    } else {
        email.isValid();
    }
});

country.field.addEventListener('input', () => {
    if (!country.field.validity.valid) {
        country.showError();
    } else {
        country.isValid();
    }
});

postal.field.addEventListener('input', () => {
    const check = re.test(postal.field.value);
    if (check === false) {
        postal.error.textContent = "Invalid postal code";
    } else {
        postal.error.textContent = "";
    }
});

pass.field.addEventListener('input', () => {
    if (!pass.field.validity.valid) {
        pass.showError();
    } else {
        pass.isValid();
        pass.valid = true;
    }
});

passConfirm.field.addEventListener('input', () => {
    if (!passConfirm.field.validity.valid) {
        passConfirm.showError();
    } else {
        passConfirm.isValid();
        passConfirm.valid = true;
    }
});

form.addEventListener('submit', (e) => {
    if (!email.field.validity.valid) {
        email.showError();
        e.preventDefault();
    }
    if (!country.field.validity.valid) {
        country.showError();
        e.preventDefault();
    }
    if (!postal.field.validity.valid) {
        postal.showError();
        e.preventDefault();
    }

    const check = re.test(postal.field.value);
    if (check === false) {
        postal.error.textContent = "Invalid postal code";
        e.preventDefault();
    } 

    if (!pass.field.validity.valid) {
        pass.showError();
        e.preventDefault();
    } 
    if (!passConfirm.field.validity.valid) {
        passConfirm.showError();
        e.preventDefault();
    }
    if (pass.field.validity.valid && passConfirm.field.validity.valid) {
        console.log(pass.field.value, passConfirm.field.value);
        if (pass.field.value !== passConfirm.field.value) {
            pass.field.value = "";
            passConfirm.field.value = "";
            pass.error.textContent = "Passwords do not match."
            passConfirm.error.textContent = "";
            e.preventDefault();
        } else {
            pass.isValid();
            passConfirm.isValid();
        }
    }
});
