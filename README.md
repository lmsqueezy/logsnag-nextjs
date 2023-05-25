# Lemon Squeezy x LogSnag

A Next.js app that sends webhook events to LogSnag.

[LogSnag](https://logsnag.com/) is a logging and event tool, letting you keep track of events, insights and analytics from all of your apps in a dedicated space.

## Get set up

1. [Create a Lemon Squeezy store](https://app.lemonsqueezy.com/register).
2. [Sign up to LogSnag](https://app.logsnag.com/).
3. [Create an API token](https://app.logsnag.com/dashboard/settings/api).
4. Deploy this app (see below) and add environment variables from Lemon Squeezy and LogSnag.
5. [Create a webhook in Lemon Squeezy](https://app.lemonsqueezy.com/help/webhooks), selecting the events you want to track in LogSnag. The webhook endpoint is at `/webhook`.

Now any events you selected in step 2 will appear in LogSnag as soon as they occur.

Note: The catch-all `subscription_updated` event is not implemented to avoid receiving duplicate events. Don't select it when creating a webhook in Lemon Squeezy.

### Helpful links

- [Read when different webhooks are sent by Lemon Squeezy](https://docs.lemonsqueezy.com/api/webhooks#event-types)
- [Read LogSnag API docs](https://docs.logsnag.com/endpoints/log)

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flmsqueezy%2Flogsnag-nextjs&env=LEMONSQUEEZY_WEBHOOK_SECRET,LOGSNAG_TOKEN,LOGSNAG_PROJECT,LOGSNAG_CHANNEL&envDescription=https%3A%2F%2Fgithub.com%2Flmsqueezy%2Flogsnag-nextjs%23environment-variables&project-name=lemonsqueezy-logsnag-nextjs&repository-name=lemonsqueezy-logsnag-nextjs)

### Environment variables

As part of the deployment you need to set 

- `LEMONSQUEEZY_WEBHOOK_SECRET` - The signing secret you added in the webhook creation form. ([Go to Lemon Squeezy webhook settings](https://app.lemonsqueezy.com/settings/webhooks))
- `LOGSNAG_TOKEN` - API token from LogSnag ([Go to LogSnag API settings](https://app.logsnag.com/dashboard/settings/api))
- `LOGSNAG_PROJECT` - Name of the project in LogSnag that you want events sent to.
- `LOGSNAG_CHANNEL` - Name of the channel in your LogSnag project that you want events sent to.

## Test the integration

If you want to test this app, switch your Lemon Squeezy to "test mode" then create a product or two and set up webhooks pointing to this app's `/webhook` endpoint.

Make a test channel in LogSnag where you can send events during testing (you can delete this channel when you're done) and use this as your `LOGSNAG_CHANNEL` enviroinment variable.

Now make purchases with your test mode products. You can use [test cards](https://docs.lemonsqueezy.com/help/getting-started/test-mode#test-card-numbers) to mimic real purchases.

Webhook events will be sent for all test mode purchases, just as they will for live purchases.
