import paypal from "@paypal/checkout-server-sdk";

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export const POST = async (req) => {
  try {
    const data = await req.json();
    const { pack, user, discount, total, coupon } = data;

    if (!pack || !pack.price) {
      return new Response(JSON.stringify({ error: "Invalid pack" }), {
        status: 400,
      });
    }

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: pack.price.toFixed(2),
              },
              discount: { currency_code: "USD", value: discount.toFixed(2) },
            },
          },
          items: [
            {
              name: pack.name,
              unit_amount: {
                currency_code: "USD",
                value: pack.price.toFixed(2),
              },
              quantity: "1",
            },
          ],
          description: `Payment for ${pack.name}`,
          custom_id: coupon || "No Coupon",
        },
      ],
      application_context: {
        brand_name: "Your Brand",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      },
    });

    const order = await client.execute(request);

    return new Response(
      JSON.stringify({
        id: order.result.id,
        approveUrl: order.result.links.find((l) => l.rel === "approve").href,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
