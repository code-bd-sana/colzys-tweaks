"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const packs = [
  { name: "Extreme Pack", price: 30 },
  { name: "Basic Pack", price: 10 },
  { name: "Pro Pack", price: 40 },
];

// Stripe Payment Form Component
const StripeCheckoutForm = ({
  formData,
  loading,
  setLoading,
  paymentStatus,
  setPaymentStatus,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleStripePayment = async () => {
    if (!stripe || !elements) {
      setPaymentStatus({
        type: "error",
        message: "Stripe not loaded. Please refresh the page.",
      });
      return;
    }

    setLoading(true);
    setPaymentStatus({ type: "processing", message: "Processing payment..." });

    // Validation
    if (!formData.email) {
      setPaymentStatus({
        type: "error",
        message: "Please enter your email",
      });
      setLoading(false);
      return;
    }

    if (!formData.region) {
      setPaymentStatus({
        type: "error",
        message: "Please select your region",
      });
      setLoading(false);
      return;
    }

    try {
      // 1. Create PaymentIntent
      const paymentData = {
        pack: {
          name: formData.selectedPack.name,
          price: formData.selectedPack.price,
        },
        user: {
          email: formData.email,
          fullName: formData.fullName,
          discord: formData.discord,
          region: formData.region,
          notes: formData.notes,
        },
        discount: formData.discount,
        total: formData.total,
        coupon: formData.coupon,
      };

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();

      if (!data.clientSecret) {
        setPaymentStatus({
          type: "error",
          message: data.error || "Failed to initialize payment",
        });
        setLoading(false);
        return;
      }

      // 2. Confirm Payment
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: formData.email,
            name: formData.fullName || "Customer",
            address: {
              country: formData.region || "US",
            },
          },
        },
      });

      // 3. Handle Result
      if (result.error) {
        setPaymentStatus({
          type: "error",
          message: `Payment failed: ${result.error.message}`,
        });
        setLoading(false);
      } else if (result.paymentIntent.status === "succeeded") {
        // ✅ Payment successful - Now send email
        try {
          // Call PUT endpoint to send email
          const emailRes = await fetch("/api/payment", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              paymentIntentId: result.paymentIntent.id,
              email: formData.email,
              name: formData.fullName || "Customer",
              packName: formData.selectedPack.name,
              amount: formData.total,
            }),
          });

          const emailData = await emailRes.json();

          if (emailData.success) {
            setPaymentStatus({
              type: "success",
              message:
                "✅ Payment successful! Check your email for confirmation and download link.",
            });
          } else {
            setPaymentStatus({
              type: "success",
              message:
                "✅ Payment successful! You'll receive email confirmation shortly.",
            });
            console.log(
              "Email sending issue (but payment successful):",
              emailData.error,
            );
          }
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          setPaymentStatus({
            type: "success",
            message:
              "✅ Payment successful! Email confirmation may be delayed.",
          });
        }

        // Show payment details
        const paymentDetails = {
          id: result.paymentIntent.id,
          amount: `$${formData.total}`,
          pack: formData.selectedPack.name,
          email: formData.email,
          date: new Date().toLocaleString(),
        };

        onPaymentSuccess(paymentDetails);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Payment Error:", err);
      setPaymentStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className='space-y-4 md:space-y-6'>
      <h2 className='text-xl md:text-2xl font-semibold text-white'>
        Pay with Card
      </h2>

      {/* Card Details */}
      <div className='p-3 md:p-4 bg-gray-700 rounded-lg'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#ffffff",
                "::placeholder": {
                  color: "#aab7c4",
                },
                backgroundColor: "#374151",
              },
              invalid: {
                color: "#fa755a",
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>

      {/* Card Info Notice - Mobile Friendly */}
      <div className='bg-gray-900 p-3 rounded-lg'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <div className='flex items-start'>
            <span className='mr-2'>💳</span>
            <div>
              <p className='text-xs font-semibold text-gray-300'>Test Card</p>
              <p className='text-xs text-gray-400'>4242 4242 4242 4242</p>
            </div>
          </div>
          <div className='flex items-start'>
            <span className='mr-2'>📅</span>
            <div>
              <p className='text-xs font-semibold text-gray-300'>Expiry</p>
              <p className='text-xs text-gray-400'>Any future date</p>
            </div>
          </div>
          <div className='flex items-start'>
            <span className='mr-2'>🔒</span>
            <div>
              <p className='text-xs font-semibold text-gray-300'>CVC</p>
              <p className='text-xs text-gray-400'>Any 3 digits</p>
            </div>
          </div>
          <div className='flex items-start'>
            <span className='mr-2'>📧</span>
            <div>
              <p className='text-xs font-semibold text-gray-300'>Email</p>
              <p className='text-xs text-gray-400'>Use any email</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handleStripePayment}
        disabled={!stripe || loading}
        className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base'>
        {loading ? (
          <span className='flex items-center justify-center'>
            <svg
              className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
            Processing Payment...
          </span>
        ) : (
          `Pay $${formData.total} with Card`
        )}
      </button>

      {/* Payment Status */}
      {paymentStatus.message && (
        <div
          className={`p-3 md:p-4 rounded-lg text-center ${
            paymentStatus.type === "success"
              ? "bg-green-900/30 text-green-400"
              : paymentStatus.type === "error"
                ? "bg-red-900/30 text-red-400"
                : "bg-blue-900/30 text-blue-400"
          }`}>
          <p className='font-medium text-sm md:text-base'>
            {paymentStatus.message}
          </p>
          {paymentStatus.type === "success" && (
            <p className='text-xs md:text-sm text-gray-300 mt-2'>
              Please check your spam folder
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Main Checkout Component
const CheckOutPageComponent = () => {
  const searchParams = useSearchParams();
  const packParam = searchParams.get("pack");

  const [selectedPack, setSelectedPack] = useState(packs[1]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({ type: "", message: "" });
  const [paymentSuccessDetails, setPaymentSuccessDetails] = useState(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [region, setRegion] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (packParam) {
      const foundPack = packs.find((p) =>
        packParam.toLowerCase().includes(p.name.toLowerCase()),
      );
      if (foundPack) setSelectedPack(foundPack);
    }
  }, [packParam]);

  useEffect(() => {
    // Coupon validation
    if (coupon.trim().toLowerCase() === "colzy") {
      setDiscount(2);
    } else {
      setDiscount(0);
    }
  }, [coupon]);

  const total = Math.max(0, selectedPack.price - discount);

  // Prepare form data
  const formData = {
    selectedPack,
    coupon,
    discount,
    total,
    fullName,
    email,
    discord,
    region,
    notes,
  };

  const handlePaymentSuccess = (details) => {
    setPaymentSuccessDetails(details);
    setTimeout(() => {
      setFullName("");
      setEmail("");
      setDiscord("");
      setRegion("");
      setNotes("");
      setCoupon("");
      setSelectedPack(packs[1]);
      setPaymentStatus({ type: "", message: "" });
    }, 10000);
  };

  // Success Screen
  if (paymentSuccessDetails) {
    return (
      <div className='min-h-screen bg-gray-900 flex justify-center items-center p-4'>
        <div className='w-full max-w-md bg-gray-800 rounded-xl p-6 md:p-8 text-center'>
          <div className='mb-6'>
            <div className='w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
              <span className='text-xl md:text-2xl'>✓</span>
            </div>
            <h2 className='text-xl md:text-2xl font-bold text-white mb-2'>
              Payment Successful!
            </h2>
            <p className='text-gray-300 text-sm md:text-base'>
              Thank you for your purchase
            </p>
          </div>

          <div className='bg-gray-900 rounded-lg p-4 md:p-6 mb-6 text-left'>
            <h3 className='text-base md:text-lg font-semibold text-white mb-4'>
              Payment Details
            </h3>
            <div className='space-y-2 md:space-y-3'>
              <div className='flex flex-col md:flex-row md:justify-between'>
                <span className='text-gray-400 text-sm'>Transaction ID:</span>
                <span className='text-white font-mono text-xs md:text-sm truncate'>
                  {paymentSuccessDetails.id}
                </span>
              </div>
              <div className='flex flex-col md:flex-row md:justify-between'>
                <span className='text-gray-400 text-sm'>Amount Paid:</span>
                <span className='text-white font-semibold text-sm md:text-base'>
                  {paymentSuccessDetails.amount}
                </span>
              </div>
              <div className='flex flex-col md:flex-row md:justify-between'>
                <span className='text-gray-400 text-sm'>Pack:</span>
                <span className='text-white text-sm md:text-base'>
                  {paymentSuccessDetails.pack}
                </span>
              </div>
              <div className='flex flex-col md:flex-row md:justify-between'>
                <span className='text-gray-400 text-sm'>Email:</span>
                <span className='text-white text-sm md:text-base truncate'>
                  {paymentSuccessDetails.email}
                </span>
              </div>
              <div className='flex flex-col md:flex-row md:justify-between'>
                <span className='text-gray-400 text-sm'>Date:</span>
                <span className='text-white text-sm md:text-base'>
                  {paymentSuccessDetails.date}
                </span>
              </div>
            </div>
          </div>

          <div className='mb-6 p-3 md:p-4 bg-blue-900/20 rounded-lg'>
            <div className='flex items-center justify-center mb-3'>
              <div className='w-6 h-6 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2'>
                <span className='text-xs'>📧</span>
              </div>
              <h4 className='text-base md:text-lg font-semibold text-blue-300'>
                Email Sent!
              </h4>
            </div>
            <p className='text-gray-300 text-sm mb-3'>
              A confirmation email with download link has been sent to:
            </p>
            <p className='text-cyan-400 font-medium bg-gray-900 p-2 rounded text-xs md:text-sm truncate'>
              {paymentSuccessDetails.email}
            </p>
            <p className='text-gray-400 text-xs md:text-sm mt-3'>
              <span className='font-semibold'>Note:</span> Check your spam
              folder
            </p>
          </div>

          <div className='space-y-3'>
            <button
              onClick={() => {
                setPaymentSuccessDetails(null);
                setPaymentStatus({ type: "", message: "" });
              }}
              className='w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold py-3 rounded-lg hover:opacity-90 transition text-sm md:text-base'>
              Make Another Payment
            </button>
            <p className='text-gray-300 text-xs md:text-sm pt-3 border-t border-gray-700'>
              Questions? Email{" "}
              <span className='text-cyan-400'>col@colzystweaks.com</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-900 flex justify-center items-start py-4 md:py-10 px-3 md:px-4'>
      <div className='w-full max-w-5xl bg-gray-800 rounded-xl p-4 md:p-6 lg:p-8'>
        {/* Mobile: Stack vertically, Desktop: Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8'>
          {/* Left - User Details */}
          <div className='space-y-4 md:space-y-6'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl md:text-2xl font-semibold text-white'>
                Checkout
              </h2>
              {/* Mobile Pack Selector */}
              <div className='block lg:hidden'>
                <select
                  value={selectedPack.name}
                  onChange={(e) => {
                    const pack = packs.find((p) => p.name === e.target.value);
                    if (pack) setSelectedPack(pack);
                  }}
                  className='px-3 py-1.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm'>
                  {packs.map((pack) => (
                    <option key={pack.name} value={pack.name}>
                      {pack.name} - ${pack.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Order Summary */}
            <div className='bg-gray-900 p-3 md:p-4 rounded-lg'>
              <h3 className='text-base md:text-lg font-semibold text-white mb-3'>
                Order Summary
              </h3>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-gray-400 text-sm md:text-base'>
                    Selected Pack:
                  </span>
                  <span className='text-white text-sm md:text-base'>
                    {selectedPack.name}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-400 text-sm md:text-base'>
                    Price:
                  </span>
                  <span className='text-white text-sm md:text-base'>
                    ${selectedPack.price}
                  </span>
                </div>
                {discount > 0 && (
                  <div className='flex justify-between'>
                    <span className='text-gray-400 text-sm md:text-base'>
                      Discount:
                    </span>
                    <span className='text-green-400 text-sm md:text-base'>
                      -${discount}
                    </span>
                  </div>
                )}
                <div className='flex justify-between border-t border-gray-700 pt-2 mt-2'>
                  <span className='text-base md:text-lg font-semibold text-white'>
                    Total:
                  </span>
                  <span className='text-xl md:text-2xl font-bold text-cyan-400'>
                    ${total}
                  </span>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className='space-y-3 md:space-y-4'>
              <input
                type='text'
                placeholder='Full name (optional)'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='w-full px-3 py-2 md:px-4 md:py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm md:text-base'
              />
              <input
                type='email'
                placeholder='Email *'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full px-3 py-2 md:px-4 md:py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm md:text-base'
              />
              <input
                type='text'
                placeholder='Discord Username (optional)'
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                className='w-full px-3 py-2 md:px-4 md:py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm md:text-base'
              />

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  required
                  className='w-full px-3 py-2 md:px-4 md:py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm md:text-base'>
                  <option value=''>Select Region *</option>
                  <option value='US'>USA</option>
                  <option value='US'>Europe</option>
                  <option value='US'>Asia</option>
                  <option value='US'>Other</option>
                </select>

                {/* Desktop Pack Selector - Hidden on Mobile */}
                <div className='hidden lg:block'>
                  <select
                    value={selectedPack.name}
                    onChange={(e) => {
                      const pack = packs.find((p) => p.name === e.target.value);
                      if (pack) setSelectedPack(pack);
                    }}
                    className='w-full px-3 py-2 md:px-4 md:py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm md:text-base'>
                    {packs.map((pack) => (
                      <option key={pack.name} value={pack.name}>
                        {pack.name} — ${pack.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-2'>
                <div className='flex-1'>
                  <input
                    type='text'
                    placeholder='Coupon Code'
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className='w-full px-3 py-2 md:px-4 md:py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm md:text-base'
                  />
                </div>
                <button
                  onClick={() => {
                    if (coupon.trim().toLowerCase() === "colzy") {
                      setDiscount(2);
                    } else {
                      setDiscount(0);
                    }
                  }}
                  className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition whitespace-nowrap text-sm md:text-base'>
                  Apply
                </button>
              </div>

              <textarea
                placeholder='Notes (PC specs + games you want to play)'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className='w-full px-3 py-2 md:px-4 md:py-2.5 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm md:text-base'
                rows={3}
              />
            </div>
          </div>

          {/* Right - Payment Section */}
          <div className='lg:border-l lg:border-gray-700 lg:pl-6 md:pl-8'>
            <Elements stripe={stripePromise}>
              <StripeCheckoutForm
                formData={formData}
                loading={loading}
                setLoading={setLoading}
                paymentStatus={paymentStatus}
                setPaymentStatus={setPaymentStatus}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </Elements>

            {/* Mobile: Important Notes - Below Payment Section */}
            <div className='mt-6 lg:hidden bg-yellow-900/20 border border-yellow-800 rounded-lg p-4'>
              <h4 className='text-yellow-300 font-semibold mb-2 text-sm md:text-base'>
                Important Notes:
              </h4>
              <ul className='text-yellow-200/80 text-xs md:text-sm space-y-1'>
                <li>• Ensure your email is correct for payment confirmation</li>
                <li>• Discord username helps us contact you faster</li>
                <li>• Include PC specs in notes for better assistance</li>
                <li>• After payment, check email for download link</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop: Important Notes - Bottom of Left Column */}
        <div className='hidden lg:block mt-6 bg-yellow-900/20 border border-yellow-800 rounded-lg p-4'>
          <h4 className='text-yellow-300 font-semibold mb-2'>
            Important Notes:
          </h4>
          <ul className='text-yellow-200/80 text-sm space-y-1'>
            <li>• Ensure your email is correct for payment confirmation</li>
            <li>• Discord username helps us contact you faster</li>
            <li>• Include PC specs in notes for better assistance</li>
            <li>• After payment, check email for download link</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Main Page Component with Suspense
const CheckOutPage = () => {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-12 h-12 md:w-16 md:h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
            <p className='text-white text-lg md:text-xl'>Loading checkout...</p>
          </div>
        </div>
      }>
      <CheckOutPageComponent />
    </Suspense>
  );
};

export default CheckOutPage;
