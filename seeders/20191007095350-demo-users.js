'use strict'
const bcrypt = require('bcrypt-nodejs')
const faker = require('faker')
const db = require('../models')
const { User, Product, Order, Coupon, CouponDistribution, Category, Review } = db

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
          isValid: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user66@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: 'admin',
          name: 'user66',
          phone: faker.phone.phoneNumberFormat(),
          address: faker.address.streetAddress(),
          birthday: faker.date.past(),
          isValid: true,
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
          isValid: true,
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
          isValid: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user3@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: 'user',
          name: 'user3',
          phone: faker.phone.phoneNumberFormat(),
          address: faker.address.streetAddress(),
          birthday: faker.date.past(),
          isValid: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user4@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: 'user',
          name: 'user4',
          phone: faker.phone.phoneNumberFormat(),
          address: faker.address.streetAddress(),
          birthday: faker.date.past(),
          isValid: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user5@example.com',
          password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(10), null),
          role: 'user',
          name: 'user5',
          phone: faker.phone.phoneNumberFormat(),
          address: faker.address.streetAddress(),
          birthday: faker.date.past(),
          isValid: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
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

    // Get all new category ids
    let categories = await Category.findAll().then(categories => {
      let results = []
      for (let i = 0; i < categories.length; i++) {
        results.push(categories[i].id)
      }
      return results
    })

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
          min: categories[0],
          max: categories[categories.length - 1]
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
        amount: 0,
        expireDate: faker.date.future(1),
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
        discount: 0,
        numberOfLimitation: faker.random.number({
          min: 1,
          max: 10
        }),
        amount: faker.random.number({
          min: 10,
          max: 200
        }),
        expireDate: faker.date.future(1),
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )

    // Get all new user ids
    let users = await User.findAll().then(users => {
      let results = []
      for (let i = 0; i < users.length; i++) {
        results.push(users[i].id)
      }
      return results
    })

    // Get all new coupon ids
    let coupons = await Coupon.findAll().then(coupons => {
      let results = []
      for (let i = 0; i < coupons.length; i++) {
        results.push(coupons[i].id)
      }
      return results
    })

    await queryInterface.bulkInsert(
      'CouponDistributions',
      Array.from({ length: 20 }).map((d) => ({
        CouponId: faker.random.number({
          min: coupons[0],
          max: coupons[coupons.length - 1]
        }),
        UserId: faker.random.number({
          min: users[0],
          max: users[users.length - 1]
        }),
        usageStatus: 1,
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )

    // Get all new products ids
    let products = await Product.findAll().then(products => {
      let results = []
      for (let i = 0; i < products.length; i++) {
        results.push(products[i].id)
      }
      return results
    })

    await queryInterface.bulkInsert(
      'PageViews',
      Array.from({ length: products.length }).map((d) => ({
        viewCount: faker.random.number({
          min: 1,
          max: 100
        }),
        UserId: faker.random.number({
          min: users[0],
          max: users[users.length - 1]
        }),
        ProductId: faker.random.number({
          min: products[0],
          max: products[products.length - 1]
        }),
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'Likes',
      Array.from({ length: 100 }).map((d) => ({
        UserId: faker.random.number({
          min: users[0],
          max: users[users.length - 1]
        }),
        ProductId: faker.random.number({
          min: products[0],
          max: products[products.length - 1]
        }),
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'Carousels',
      Array.from({ length: 10 }).map((d) => ({
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        image: faker.image.business(),
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'Orders',
      Array.from({ length: 20 }).map((d) => ({
        name: faker.lorem.word(),
        phone: faker.phone.phoneNumberFormat(),
        address: faker.address.streetAddress(),
        sn: faker.random.alphaNumeric(8),
        shippingStatus: 1,
        paymentStatus: 1,
        totalAmount: faker.random.number({
          min: 1000,
          max: 9999
        }),
        UserId: faker.random.number({
          min: users[0],
          max: users[users.length - 1]
        }),
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )

    // Get all new orders ids
    let orders = await Order.findAll().then(orders => {
      let results = []
      for (let i = 0; i < orders.length; i++) {
        results.push(orders[i].id)
      }
      return results
    })

    await queryInterface.bulkInsert(
      'OrderItems',
      Array.from({ length: 100 }).map((d) => ({
        OrderId: faker.random.number({
          min: orders[0],
          max: orders[orders.length - 1]
        }),
        ProductId: faker.random.number({
          min: products[0],
          max: products[products.length - 1]
        }),
        price: faker.random.number({
          min: 100,
          max: 999,
        }),
        quantity: faker.random.number({
          min: 1,
          max: 10,
        }),
        dataStatus: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'Reviews',
      Array.from({ length: (products.length * 5) }).map((d) => ({
        review: faker.lorem.paragraphs(1, false),
        UserId: faker.random.number({
          min: users[0],
          max: users[users.length - 1]
        }),
        ProductId: faker.random.number({
          min: products[0],
          max: products[products.length - 1]
        }),
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
    await queryInterface.bulkDelete('Carousels', null, {})
    await queryInterface.bulkDelete('Likes', null, {})
    await queryInterface.bulkDelete('PageViews', null, {})
    await queryInterface.bulkDelete('Orders', null, {})
    await queryInterface.bulkDelete('OrderItems', null, {})
    await queryInterface.bulkDelete('Reviews', null, {})
  }
}
