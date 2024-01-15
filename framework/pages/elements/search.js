class Search {

    constructor(page){
        this.page = page
        this._inputSearch = this.page.locator('[id="search"]')
        this._resultSearch = null
        this._resultMessageSearch = null
    }

    async submitInputSearch(searchQuery){
        await this._inputSearch.click()
        await this._inputSearch.fill(searchQuery)
        await this._inputSearch.press('Enter')
    }

    async getResultSearch(){
        this._resultSearch = await this.page.locator('[class="search results"]')
        //[class="products list items product-items"]
        const result = this._resultSearch.isVisible()

        return result
    }

    async getResultMessage(){
        this._resultMessageSearch = await this.page.locator('[class="message notice"]').innerText()
        return await this._resultMessageSearch
    }
}

module.exports = Search