class Checkout {

    constructor(page){
        this.page = page
        
        this._productslist = this.page.locator('[class="products-grid grid"]')

        this._product = this.page.locator('ol > li:nth-child(2)')
        this._productSizeOption = this.page.locator('[id="option-label-size-143-item-167"]')
        this._productColorOption = this.page.locator('[id="option-label-color-93-item-60"]')
        this._addToCart = this.page.locator('[id="product-addtocart-button"]')

        this._proceedToCheckoutButton = null
        this._inputEmail = null
        this._inputFirstName = null
        this._inputLastName = null
        this._inputStreet = null
        this._inputCity = null
        this._dropdownState = null
        this._inputZip = null
        this._dropdownCountry = null
        this._inputPhone = null
        this._radioShipping = null
        this._submitCheckoutButton = null
        this._order = null
    }

    async openPage(){
        await this.page.goto('/')
    }

    async openProduct(){
        await this._product.click()
    }

    async chooseSize(){
        await this._productSizeOption.click()
    }

    async chooseColor(){
        await this._productColorOption.click()
    }

    async addToCart(){
        await this._addToCart.click()
        return this._successAdding = await this.page.locator('[class="message-success success message"]').innerText()
    }

    async openCart(){
        await this.page.goto('/checkout/cart/')
        this._proceedToCheckoutButton = await this.page.locator('[data-role=proceed-to-checkout][class="action primary checkout"]')
    }

    async proceedToCheckout(){
        this._proceedToCheckoutButton.click()
        this._inputEmail = await this.page.locator('._with-tooltip #customer-email')
        this._inputFirstName = await this.page.locator('[name="firstname"]')
        this._inputLastName = await this.page.locator('[name="lastname"]')
        this._inputStreet = await this.page.locator('[name="street[0]"]')
        this._inputCity = await this.page.locator('[name="city"]')
        this._inputState = await this.page.locator('[name="region"]')
        this._inputZip = await this.page.locator('[name="postcode"]')
        this._dropdownCountry = await this.page.locator('[name="country_id"]')
        this._inputPhone = await this.page.locator('[name="telephone"]')
        this._radioShipping = await this.page.getByLabel('Fixed')
        this._submitCheckoutButton = await this.page.locator('[class="button action continue primary"]')
    }

    async fillEmail(email){
        await this._inputEmail.fill(email)
    }

    async fillFirstName(firstName){
        await this._inputFirstName.fill(firstName)
    }

    async fillLastName(lastName){
        await this._inputLastName.fill(lastName)
    }

    async fillStreet(street){
        await this._inputStreet.fill(street)
    }

    async fillCity(city){
        await this._inputCity.fill(city)
    }

    async chooseCountry(country){
        await this._dropdownCountry.selectOption(country)
    }

    async chooseState(state){
        await this._inputState.fill(state)
    }

    async fillZip(zip){
        await this._inputZip.fill(zip)
    }

    async fillPhone(phone){
        await this._inputPhone.fill(phone)
    }

    async chooseShipping(){
        await this._radioShipping.check()
    }

    async proceedToPurchase(){
        await this._submitCheckoutButton.click()
    }

    async purchaseConfirm(){
        await this.page.getByLabel('My billing and shipping address are the same').check()
        this._proceedToCheckoutButton = await this.page.locator('[class="action primary checkout"]')
        await this._proceedToCheckoutButton.click()
    }

    async getOrderNumber(){
        this._order = await this.page.locator('.checkout-success>p>span')
        return this._order.innerText()
    }
}

module.exports = Checkout