# Lemon Squeezy x LogSnag

A Next.js app that sends webhook events to LogSnag.

[LogSnag](https://logsnag.com/) is a brilliant logging and event tool, letting you keep track of events, insights and analytics from all of your apps in a dedicated space.

## Get set up

1. [Create a Lemon Squeezy store](https://app.lemonsqueezy.com/register)
2. [Set up webhooks](https://app.lemonsqueezy.com/help/webhooks)
3. [Sign up to LogSnag](https://app.logsnag.com/)
4. [Create an API token](https://app.logsnag.com/dashboard/settings/api)
5. Deploy this app
6. Add environment variables from Lemon Squeezy and LogSnag

## Testing

If you want to test this app, switch your Lemon Squeezy to "test mode" and create a product or two.

Make a test channel in LogSnag, where you can send events during testing (you can delete this channel when you're done).

Now make purchases with your test mode products. You can use [test cards](https://docs.lemonsqueezy.com/help/getting-started/test-mode#test-card-numbers) to mimic real purchases.

Webhook events will be sent for all test mode purchases, just as they will for live purchases.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flmsqueezy%2Flogsnag-nextjs&env=LEMONSQUEEZY_WEBHOOK_SECRET,LOGSNAG_TOKEN,LOGSNAG_PROJECT,LOGSNAG_CHANNEL&envDescription=https%3A%2F%2Fgithub.com%2Flmsqueezy%2Flogsnag-nextjs%23environment-variables&project-name=lemonsqueezy-logsnag-nextjs&repository-name=lemonsqueezy-logsnag-nextjs)

### Environment variables

- `LEMONSQUEEZY_WEBHOOK_SECRET` - The signing secret you added in the webhook creation form.
- `LOGSNAG_TOKEN` - API token from LogSnag.
- `LOGSNAG_PROJECT` - Name of the project in LogSnag that you want events sent to.
- `LOGSNAG_CHANNEL` - Name of the channel in your LogSnag project that you want events sent to.