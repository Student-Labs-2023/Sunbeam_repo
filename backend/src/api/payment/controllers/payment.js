'use strict';

const axiosDefault = require('axios');

const base64 = btoa(`${process.env.PAYKEEPER_USERNAME}:${process.env.PAYKEEPER_PASSWORD}`);

const axios = axiosDefault.create({
  baseURL: process.env.PAYKEEPER_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + base64,
  },
})

async function getToken() {
  const response = await axios.get('/info/settings/token');

  const isDataObject = typeof response.data == 'object';
  const isTokenInData = isDataObject && 'token' in response.data;

  if (!isTokenInData)
    return { error: true };

  return response.data.token;
}

/*
props: {
  payAmount: number (12.34 is 12.34 rubles)
  serviceName: string,
  clientEmail: string,
  clientPhone: string,
}
*/
async function getInvoice(token, props) {
  const data = (await axios.post('/change/invoice/preview', {
    token: token,
    
    // not using spread operator to ensure no unwanted data is sent
    pay_amount: props.payAmount,
    service_name: props.serviceName,
    client_email: props.clientEmail,
    client_phone: props.clientPhone,
  })).data;

  if (typeof data != 'object' || data?.result === 'fail') {
    return { error: true, message: data?.msg };
  }

  return {
    invoice_url: data.invoice_url,
    invoice_id: data.invoice_id,
  };
}

/**
 * A set of functions called "actions" for `payment`
 */

module.exports = {
  getNewPaymentLink: async (ctx, next) => {
    const token = await getToken();
    if (token?.error) {
      ctx.internalServerError('Ошибка при получении токена');
      return;
    }
    const invoice = await getInvoice(token, ctx.request.body);
    if (invoice?.error) {
      ctx.badRequest(invoice.message);
      return;
    }
    ctx.body = invoice;
  },
  getStatus: async (ctx, next) => {
    const response = await axios.get(`/info/invoice/byid?id=${ctx.request.query.id}`);
    return {
      status: response.data.status,
    };
  },
};
