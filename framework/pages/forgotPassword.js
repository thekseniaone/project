class ForgotPassword {

    constructor(page){
        this.page = page
        
        this._inputEmail = this.page.locator('[id="email_address"]')
        this._submitReset = this.page.locator('[class="action submit primary"]')
    }

    async pageOpen(){
        await this.page.goto('/customer/account/forgotpassword/')
    }

    async fillEmail(email){
        await this._inputEmail.fill(email)
    }
        
    async submitReset(){
        this._submitReset.click()
    }

    async getResultMessage(){
        this._resultMessage = await this.page.locator('[class="message-success success message"]').innerText()
        return await this._resultMessage
    }
}

module.exports = ForgotPassword