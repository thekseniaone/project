const { faker } = require('@faker-js/faker')

const Config = {
    credentialsCreateAccount: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: faker.internet.password(),
        email: faker.internet.email()
    },
    credentialsLogin: {
        email: 'tovep@mailinator.com',
        password: 'Pa$$w0rd!',
    },
    credentialsPurchase:{
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
        country: faker.location.country(),
        phone: faker.phone.number()
    },

}

module.exports = Config