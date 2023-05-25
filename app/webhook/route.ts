/*

- To turn off notifications for specific events change "notify" to false
- To turn off specific events, unselect them in the webhook settings in Lemon Squeezy
- "subscription_updated" is not implemented as it doesn't make sense for this kind of alert system

Read about when different events are sent at https://docs.lemonsqueezy.com/api/webhooks#event-types

*/

import { LogSnag } from 'logsnag';

const logsnag = new LogSnag({
  token: process.env.LOGSNAG_TOKEN,
  project: process.env.LOGSNAG_PROJECT
})

export async function POST(request: Request) {

  /* Check webhook signature */

  const crypto = require('crypto');

  const rawBody = await request.text()

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
  const signature = Buffer.from(request.headers.get('X-Signature') || '', 'utf8');

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error('Invalid signature.');
  }

  /* Parse webhook data */

  const data = JSON.parse(rawBody)

  const eventName = data['meta']['event_name']
  const obj = data['data']['attributes']
  const objId = data['data']['id']

  let eventData

  switch (eventName) {

    case 'order_created':

      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: "New order",
        description: `${obj['first_order_item']['product_name']} (${obj['first_order_item']['variant_name']})\n${obj['subtotal_formatted']} (\+${obj['tax_formatted']} tax)\nOrder #${obj['order_number']} • ${obj['user_email']} • ${obj['user_name']}`,
        icon: "💳",
        notify: true,
        tags: {
          email: obj['user_email'],
          'customer-id': obj['customer_id']
        } 
      }

      break;

    case 'order_refunded':

      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: "Order refunded",
        description: `${obj['first_order_item']['product_name']} (${obj['first_order_item']['variant_name']})\n${obj['subtotal_formatted']} (\+${obj['tax_formatted']} tax)\nOrder #${obj['order_number']} • ${obj['user_email']} • ${obj['user_name']}`,
        icon: "◀️",
        notify: true,
        tags: {
          email: obj['user_email'],
          'customer-id': obj['customer_id']
        } 
      }

      break;

    case 'subscription_created':

      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: "New subscription",
        description: `${obj['product_name']} (${obj['variant_name']})\nSubscription #${objId}\n${obj['user_email']} • ${obj['user_name']}`,
        icon: "💎",
        notify: true,
        tags: {
          email: obj['user_email'],
          'customer-id': obj['customer_id'],
          'subscription-id': objId
        } 
      }
      
      break;

    case 'subscription_updated':

      /* Not implemented */

      return new Response('OK')

    case 'subscription_cancelled':

      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: "Subscription cancelled",
        description: `${obj['product_name']} (${obj['variant_name']})\nSubscription #${objId}\n${obj['user_email']} • ${obj['user_name']}`,
        icon: "❌",
        notify: true,
        tags: {
          email: obj['user_email'],
          'customer-id': obj['customer_id'],
          'subscription-id': objId
        } 
      }
      
      break;

    case 'subscription_resumed':

      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: "Subscription resumed",
        description: `${obj['product_name']} (${obj['variant_name']})\nSubscription #${objId}\n${obj['user_email']} • ${obj['user_name']}`,
        icon: "👍",
        notify: true,
        tags: {
          email: obj['user_email'],
          'customer-id': obj['customer_id'],
          'subscription-id': objId
        } 
      }
      
      break;

    case 'subscription_paused':

      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: "Subscription paused",
        description: `${obj['product_name']} (${obj['variant_name']})\nSubscription #${objId}\n${obj['user_email']} • ${obj['user_name']}`,
        icon: "✋",
        notify: true,
        tags: {
          email: obj['user_email'],
          'customer-id': obj['customer_id'],
          'subscription-id': objId
        } 
      }
      
      break;

    case 'subscription_unpaused':

      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: "Subscription unpaused",
        description: `${obj['product_name']} (${obj['variant_name']})\nSubscription #${objId}\n${obj['user_email']} • ${obj['user_name']}`,
        icon: "👍",
        notify: true,
        tags: {
          email: obj['user_email'],
          'customer-id': obj['customer_id'],
          'subscription-id': objId
        } 
      }
      
      break;

    case 'subscription_payment_success':
      
      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: `Subscription payment (${obj['billing_reason']})`,
        description: `${obj['subtotal_formatted']} (\+${obj['tax_formatted']} tax)\nSubscription #${obj['subscription_id']}`,
        icon: "💵",
        notify: true,
        tags: {
          'subscription-id': obj['subscription_id']
        } 
      }
      
      break;

    case 'subscription_payment_failed':
      
      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: `Subscription payment failed (${obj['billing_reason']})`,
        description: `${obj['subtotal_formatted']} (\+${obj['tax_formatted']} tax)\nSubscription #${obj['subscription_id']}`,
        icon: "🚫",
        notify: true,
        tags: {
          'subscription-id': obj['subscription_id']
        } 
      }
      
      break;

    case 'subscription_payment_recovered':
      
      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: `Subscription payment recovered (${obj['billing_reason']})`,
        description: `${obj['subtotal_formatted']} (\+${obj['tax_formatted']} tax)\nSubscription #${obj['subscription_id']}`,
        icon: "😎",
        notify: true,
        tags: {
          'subscription-id': obj['subscription_id']
        } 
      }
      
      break;

    case 'license_key_created':
      
      eventData = {
        channel: process.env.LOGSNAG_CHANNEL,
        event: `License key created`,
        description: `${obj['user_email']} • ${obj['user_name']}`,
        icon: "🔑",
        notify: true,
        tags: {
          email: obj['user_email'],
          'customer-id': obj['customer_id']
        } 
      }
      
      break;

  }

  /* Send to LogSnag */

  await logsnag.publish(eventData)

  /* Send back a 200 response */

  return new Response('OK')
}