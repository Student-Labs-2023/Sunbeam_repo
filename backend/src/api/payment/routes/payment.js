module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/payment',
      handler: 'payment.getNewPaymentLink',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/payment',
      handler: 'payment.getStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
