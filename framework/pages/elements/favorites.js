class Favorites {

    constructor(page){
        this.page = page
        
        this._productslist = this.page.locator('[class="products-grid grid"]')

        this._product = this.page.locator('ol > li:nth-child(2)')
        this._buttonAddToFav = this.page.getByRole('link', { name: 'Add to Wish List' })
        this._result = this.page.locator('[class="message-success success message"]')
        this._productName = null
    }

    async openPage(){
        await this.page.goto('/wishlist/')
    }

    async openProduct(){
        await this._product.waitFor({state: 'visible'})
        await this._product.click()
        return this.page.locator('[itemprop="name"]').innerText()
    }

    async addToFavorites(){
        await this._buttonAddToFav.waitFor({state: 'visible'})
        await this._buttonAddToFav.click()
        
    }

    async getResultText(){
        return this._result.textContent()
    }
}

module.exports = Favorites