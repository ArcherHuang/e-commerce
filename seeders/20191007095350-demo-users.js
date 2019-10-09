'use strict'
const bcrypt = require('bcrypt-nodejs')
const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'mmosconii@gmail.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: 'admin',
          name: 'root',
          phone: faker.phone.phoneNumberFormat(),
          address: faker.address.streetAddress(),
          birthday: faker.date.past(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user1@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: 'user',
          name: 'user1',
          phone: faker.phone.phoneNumberFormat(),
          address: faker.address.streetAddress(),
          birthday: faker.date.past(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user2@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: 'user',
          name: 'user2',
          phone: faker.phone.phoneNumberFormat(),
          address: faker.address.streetAddress(),
          birthday: faker.date.past(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )

    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Category 1',
          description: faker.lorem.sentence(10),
          dataStatus: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Category 2',
          description: faker.lorem.sentence(10),
          dataStatus: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Category 3',
          description: faker.lorem.sentence(10),
          dataStatus: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Category 4',
          description: faker.lorem.sentence(10),
          dataStatus: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Category 5',
          description: faker.lorem.sentence(10),
          dataStatus: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )

    await queryInterface.bulkInsert(
      'Products',
      Array.from({ length: 100 }).map((d) => ({
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        image: faker.image.business(),
        price: faker.random.number({
          min: 100,
          max: 1000
        }),
        recommendedPrice: faker.random.number({
          min: 100,
          max: 1000
        }),
        inventory: faker.random.number({
          min: 0,
          max: 50
        }),
        length: faker.random.number({
          min: 10,
          max: 50
        }),
        width: faker.random.number({
          min: 10,
          max: 50
        }),
        height: faker.random.number({
          min: 10,
          max: 50
        }),
        weight: faker.random.number({
          min: 100,
          max: 20000
        }),
        CategoryId: faker.random.number({
          min: 1,
          max: 5
        }),
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'Coupons',
      Array.from({ length: 10 }).map((d) => ({
        name: faker.lorem.word(),
        sn: faker.random.alphaNumeric(8),
        discount: faker.random.number({
          min: 5,
          max: 50
        }),
        numberOfLimitation: faker.random.number({
          min: 1,
          max: 10
        }),
        expireDate: faker.date.future(1),
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Products', null, {})
    await queryInterface.bulkDelete('Coupons', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
