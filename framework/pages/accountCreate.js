class AccountCreate {

    constructor(page){
        this.page = page

        this._inputFirstName = this.page.locator('[id="firstname"]')
        this._inputLastName = this.page.locator('[id="lastname"]')
        this._inputEmail = this.page.locator('[id="email_address"]')
        this._inputPassword = this.page.locator('[id="password"]')
        this._inputPasswordConfirm = this.page.locator('[id="password-confirmation"]')
        this._submitButtonCreateAccount = this.page.locator('[class="action submit primary"]')
        this._inputEmailError = null
        this._successMessageCreation = null
    }

    async pageOpen(){
        await this.page.goto('/customer/account/create/')
    }

    async fillFirstName(firstName){
        await this._inputFirstName.fill(firstName)
    }

    async fillLastName(lastName){
        await this._inputLastName.fill(lastName)
    }

    async fillEmail(email){
        await this._inputEmail.fill(email)
    }

    async fillPassword(password){
        await this._inputPassword.fill(password)
    }

    async fillConfirmPassword(password){
        await this._inputPasswordConfirm.fill(password)
    }

    async submitCreateAccount(){
        await this._submitButtonCreateAccount.click()
    }

    async getEmailErrorText(){
        this._inputEmailError = await this.page.locator('[id="email_address-error"]')
        return this._inputEmailError.innerText()
    }

    async checkIfSuccess(){
        this._successMessageCreation = this.page.locator('[class="message-success success message"]')
        return this._successMessageCreation.innerText()
    }
}

module.exports = AccountCreate