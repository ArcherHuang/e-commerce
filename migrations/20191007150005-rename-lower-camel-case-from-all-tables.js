'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Carts', 'data_status', 'dataStatus'),

      queryInterface.renameColumn('CartItems', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('CartItems', 'cart_id', 'cartId'),
      queryInterface.renameColumn('CartItems', 'product_id', 'productId'),

      queryInterface.renameColumn('Categories', 'data_status', 'dataStatus'),

      queryInterface.renameColumn('Coupons', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('Coupons', 'number_of_limitation', 'numberOfLimitation'),
      queryInterface.renameColumn('Coupons', 'expire_date', 'expireDate'),

      queryInterface.renameColumn('CouponDistributions', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('CouponDistributions', 'coupon_id', 'couponId'),
      queryInterface.renameColumn('CouponDistributions', 'user_id', 'userId'),

      queryInterface.renameColumn('Likes', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('Likes', 'user_id', 'userId'),
      queryInterface.renameColumn('Likes', 'product_id', 'productId'),

      queryInterface.renameColumn('Orders', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('Orders', 'total_amount', 'totalAmount'),
      queryInterface.renameColumn('Orders', 'shipping_status', 'shippingStatus'),
      queryInterface.renameColumn('Orders', 'payment_status', 'paymentStatus'),
      queryInterface.renameColumn('Orders', 'user_id', 'userId'),
      queryInterface.renameColumn('Orders', 'coupon_distribution_id', 'couponDistributionId'),
      queryInterface.renameColumn('Orders', 'add_discount', 'addDiscount'),

      queryInterface.renameColumn('OrderItems', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('OrderItems', 'order_id', 'orderId'),
      queryInterface.renameColumn('OrderItems', 'product_id', 'productId'),

      queryInterface.renameColumn('PageViews', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('PageViews', 'view_count', 'viewCount'),
      queryInterface.renameColumn('PageViews', 'user_id', 'userId'),
      queryInterface.renameColumn('PageViews', 'product_id', 'productId'),

      queryInterface.renameColumn('Payments', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('Payments', 'payment_method', 'paymentMethod'),
      queryInterface.renameColumn('Payments', 'pay_at', 'payAt'),
      queryInterface.renameColumn('Payments', 'order_id', 'orderId'),

      queryInterface.renameColumn('Products', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('Products', 'recommended_price', 'recommendedPrice'),

      queryInterface.renameColumn('Reviews', 'data_status', 'dataStatus'),
      queryInterface.renameColumn('Reviews', 'user_id', 'userId'),
      queryInterface.renameColumn('Reviews', 'product_id', 'productId'),

      queryInterface.renameColumn('Users', 'is_valid', 'isValid'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('Carts', 'dataStatus', 'data_status'),

      queryInterface.renameColumn('CartItems', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('CartItems', 'cartId', 'cart_id'),
      queryInterface.renameColumn('CartItems', 'productId', 'product_id'),

      queryInterface.renameColumn('Categories', 'dataStatus', 'data_status'),

      queryInterface.renameColumn('Coupons', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('Coupons', 'numberOfLimitation', 'number_of_limitation'),
      queryInterface.renameColumn('Coupons', 'expireDate', 'expire_date'),

      queryInterface.renameColumn('CouponDistributions', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('CouponDistributions', 'couponId', 'coupon_id'),
      queryInterface.renameColumn('CouponDistributions', 'userId', 'user_id'),
      queryInterface.renameColumn('CouponDistributions', 'usageStatus', 'usage_status'),

      queryInterface.renameColumn('Likes', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('Likes', 'userId', 'user_id'),
      queryInterface.renameColumn('Likes', 'productId', 'product_id'),

      queryInterface.renameColumn('Orders', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('Orders', 'totalAmount', 'total_amount'),
      queryInterface.renameColumn('Orders', 'shippingStatus', 'shipping_status'),
      queryInterface.renameColumn('Orders', 'paymentStatus', 'payment_status'),
      queryInterface.renameColumn('Orders', 'userId', 'user_id'),
      queryInterface.renameColumn('Orders', 'couponDistributionId', 'coupon_distribution_id'),
      queryInterface.renameColumn('Orders', 'addDiscount', 'add_discount'),

      queryInterface.renameColumn('OrderItems', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('OrderItems', 'orderId', 'order_id'),
      queryInterface.renameColumn('OrderItems', 'productId', 'product_id'),

      queryInterface.renameColumn('PageViews', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('PageViews', 'viewCount', 'view_count'),
      queryInterface.renameColumn('PageViews', 'userId', 'user_id'),
      queryInterface.renameColumn('PageViews', 'productId', 'product_id'),

      queryInterface.renameColumn('Payments', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('Payments', 'paymentMethod', 'payment_method'),
      queryInterface.renameColumn('Payments', 'payAt', 'pay_at'),
      queryInterface.renameColumn('Payments', 'orderId', 'order_id'),

      queryInterface.renameColumn('Products', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('Products', 'recommendedPrice', 'recommended_price'),

      queryInterface.renameColumn('Reviews', 'dataStatus', 'data_status'),
      queryInterface.renameColumn('Reviews', 'userId', 'user_id'),
      queryInterface.renameColumn('Reviews', 'productId', 'product_id'),

      queryInterface.renameColumn('Users', 'isValid', 'is_valid'),
    ]);
  }
};
