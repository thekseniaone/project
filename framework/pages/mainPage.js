class MainPage {

    constructor(page){
        this.page = page

    }

    async mainPageOpen(){
        await this.page.goto('/')
    }

}

module.exports = MainPage