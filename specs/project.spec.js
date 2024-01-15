// Cписок тестов для проекта https://magento.softwaretestingboard.com/

const { test, expect } = require('@playwright/test')
const Config = require('../framework/config/config.js')

const MainPage = require('../framework/pages/mainPage.js')
const Search = require('../framework/pages/elements/search.js')
const AccountCreate = require('../framework/pages/accountCreate.js')
const AccountLogin = require('../framework/pages/accountLogin.js')
const ForgotPassword = require('../framework/pages/forgotPassword.js')
const Checkout = require('../framework/pages/checkout.js')
const Favorites = require('../framework/pages/elements/favorites.js')



// тест на поиск
test('1. Successful search', async ({ page }) => {
  const mainPage = new MainPage(page)
  const search = new Search(page)
  const query = 'shirt'

  await mainPage.mainPageOpen()
  await search.submitInputSearch(query)
  await expect(page).toHaveTitle(`Search results for: '${query}'`)
  await expect(page).toHaveURL(new RegExp('/catalogsearch/result/'))
  const searchResult = await search.getResultSearch()
  await expect(searchResult).toBeTruthy()
})

//тест на поиск
test('2. Search returns nothing', async ({ page }) => {
  const mainPage = new MainPage(page)
  const search = new Search(page)
  const query = 'fsdffdf'

  await mainPage.mainPageOpen()
  await search.submitInputSearch(query)
  await expect(page).toHaveTitle(`Search results for: '${query}'`)
  await expect(page).toHaveURL(new RegExp('/catalogsearch/result/'))

  const searchResult = await search.getResultSearch()
  const searchResultText = await search.getResultMessage()
  await expect(searchResult).toBeFalsy()
  await expect(searchResultText).toContain('Your search returned no results.')
  
})

// Создание аккаунта с незаполненным обязательным полем 
test('3. Creating account without reuqired field email', async ({ page }) => {
  const creatingAccount = new AccountCreate(page)

  await creatingAccount.pageOpen()

  await creatingAccount.fillFirstName(Config.credentialsCreateAccount.firstName)
  await creatingAccount.fillLastName(Config.credentialsCreateAccount.lastName)
  await creatingAccount.fillPassword(Config.credentialsCreateAccount.password)
  await creatingAccount.fillConfirmPassword(Config.credentialsCreateAccount.password)
  await creatingAccount.submitCreateAccount()

  const error = await creatingAccount.getEmailErrorText()
  await expect(error).toContain('This is a required field.')
  await expect(page).toHaveTitle('Create New Customer Account')
  await expect(page).toHaveURL(new RegExp('/create/'))
})

// Создание аккаунта
test('4. Creating account successfully', async ({ page }) => {
  const creatingAccount = new AccountCreate(page)

  await creatingAccount.pageOpen()

  await creatingAccount.fillFirstName(Config.credentialsCreateAccount.firstName)
  await creatingAccount.fillLastName(Config.credentialsCreateAccount.lastName)
  await creatingAccount.fillEmail(Config.credentialsCreateAccount.email)
  await creatingAccount.fillPassword(Config.credentialsCreateAccount.password)
  await creatingAccount.fillConfirmPassword(Config.credentialsCreateAccount.password)
  await creatingAccount.submitCreateAccount()
  const message = await creatingAccount.checkIfSuccess()

  await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/')
  await expect(page).toHaveTitle('My Account')
  await expect(message).toContain('Thank you for registering with Main Website Store.')
})

// Логин с неправильными данными для входа
test('5. Login with the wrong pass', async ({ page }) => {
  const Login = new AccountLogin(page)

  await Login.pageOpen()

  await Login.fillEmail(Config.credentialsLogin.email)
  await Login.fillPassword('123')
  await Login.submitLogin()

  const error = await Login.getError()
  await expect(error).toContain('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
  await expect(page).toHaveTitle('Customer Login')
  await expect(page).toHaveURL(new RegExp('/login/'))

})

// Логин с правильными данными для входа
test('6. Login with the correct credentials', async ({ page }) => {
  const Login = new AccountLogin(page)

  await Login.pageOpen()

  await Login.fillEmail(Config.credentialsLogin.email)
  await Login.fillPassword(Config.credentialsLogin.password)
  await Login.submitLogin()

  await expect(page).toHaveTitle('My Account')
  await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/')

  const cookies = await page.context().cookies()
  const loginCookie = await cookies.find(cookie => cookie.name === 'X-Magento-Vary')
  await expect(loginCookie).toBeDefined
 
})

//logout
test('7. Log out', async ({ page }) => {
    const Login = new AccountLogin(page)
  
    await Login.pageOpen()
  
    await Login.fillEmail(Config.credentialsLogin.email)
    await Login.fillPassword(Config.credentialsLogin.password)
    await Login.submitLogin()
  
    await expect(page).toHaveTitle('My Account')
    await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/')
  
    await Login.logOut()
    await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/logoutSuccess/')
  })

//pass reset
test('8. Password reset', async ({ page }) => {
    const PassReset = new ForgotPassword(page)
  
    await PassReset.pageOpen()
    await PassReset.fillEmail(Config.credentialsCreateAccount.email)  
    await PassReset.submitReset()

    const result = await PassReset.getResultMessage()
    await expect(result).toContain(`If there is an account associated with ${Config.credentialsCreateAccount.email} you will receive an email with a link to reset your password.`)
})

//checkout
test('9. Successfull Purchase', async ({ page }) => {
  const Purchase = new Checkout(page)

  await Purchase.openPage()

  await Purchase.openProduct()
  await Purchase.chooseSize()
  await Purchase.chooseColor()
  await Purchase.addToCart()
  await Purchase.openCart()
  await Purchase.proceedToCheckout()

  await Purchase.fillEmail(Config.credentialsPurchase.email)
  await Purchase.fillFirstName(Config.credentialsPurchase.firstName)
  await Purchase.fillLastName(Config.credentialsPurchase.lastName)
  await Purchase.fillStreet(Config.credentialsPurchase.street)
  await Purchase.chooseCountry('Laos')
  await Purchase.fillCity(Config.credentialsPurchase.city)
  await Purchase.chooseState(Config.credentialsPurchase.state)
  await Purchase.fillZip(Config.credentialsPurchase.zip)
  await Purchase.fillPhone(Config.credentialsPurchase.phone)

  await Purchase.chooseShipping()
  await Purchase.proceedToPurchase()
  await Purchase.purchaseConfirm()
  const result = await Purchase.getOrderNumber()

  await expect(page).toHaveURL(new RegExp('/checkout/onepage/success/'))
  await expect(page).toHaveTitle('Success Page')
  await expect(result).toBeDefined()
  })

//добавить товар в избранное
test('10. Adding product to favorites', async ({ page }) => {
    const Login = new AccountLogin(page)
    const Fav = new Favorites(page)
    const Main = new MainPage(page)

    await Login.pageOpen()

    await Login.fillEmail(Config.credentialsLogin.email)
    await Login.fillPassword(Config.credentialsLogin.password)
    await Login.submitLogin()

    
    await Main.mainPageOpen()

    const product = await Fav.openProduct()
    page.reload()
    await Fav.addToFavorites()

    await Fav.openPage()

    const favProduct = await page.getByText(product)
    await expect(favProduct).toBeDefined()
    await expect(page).toHaveTitle('My Wish List')
  })