class AccountLogin {

    constructor(page){
        this.page = page

        this._inputEmail = this.page.locator('[id="email"]')
        this._inputPassword = this.page.locator('[id="pass"][title="Password"]')
        this._submitLogin = this.page.locator('[class="action login primary"]')

        this._wrongCredentialsCheck = null
    }

    async pageOpen(){
        await this.page.goto('/customer/account/login/')
    }

    async fillEmail(email){
        await this._inputEmail.fill(email)
    }

    async fillPassword(password){
        await this._inputPassword.fill(password)
    }

    async submitLogin(){
        await this._submitLogin.click()
    }

    async getError(){
        this._wrongCredentialsCheck = await this.page.locator('[class="message-error error message"]')
        return this._wrongCredentialsCheck.innerText()
    }

    async logOut(){
        await this.page.goto('/customer/account/logout/')
    }

}

module.exports = AccountLogin