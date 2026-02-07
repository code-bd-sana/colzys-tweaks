import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen bg-[#0b1116] text-white p-6 md:p-12'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-10'>
          <Link href='/' className='logo text-2xl'>
            Colzys Tweaks
          </Link>
          <h1 className='text-highlight mt-6 text-4xl md:text-5xl'>
            Privacy Policy
          </h1>
          <p className='text-gray mt-4'>
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className='bg-secondary rounded-2xl p-6 md:p-10 space-y-8'>
          {/* Introduction */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>1. Introduction</h2>
            <p className='text-gray'>
              Welcome to Colzys Tweaks. We provide gaming optimization services
              designed to enhance your gaming experience. This Privacy Policy
              explains how we handle your information when you purchase and use
              our services.
            </p>
          </section>

          {/* No Refunds Policy */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>2. No Refunds Policy</h2>
            <p className='text-gray'>
              <strong className='text-white'>All sales are final.</strong> Due
              to the digital nature of our products and the immediate delivery
              of optimization services, we do not offer refunds or exchanges
              once a purchase is completed. Please ensure you have reviewed the
              product details and system requirements before making a purchase.
            </p>
            <div className='mt-4 p-4 bg-[#1a2a36] rounded-xl border-l-4 border-[#00E9E7]'>
              <p className='text-gray'>
                <span className='text-white font-semibold'>Important:</span> Our
                products are delivered instantly via email after purchase. Since
                you receive the digital product immediately, refunds cannot be
                processed.
              </p>
            </div>
          </section>

          {/* Information Collection */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>
              3. Information We Collect
            </h2>
            <div className='space-y-4'>
              <div>
                <h3 className='text-bold text-xl mb-2'>
                  3.1 Purchase Information
                </h3>
                <ul className='text-gray list-disc pl-6 space-y-2'>
                  <li>Email address (for product delivery)</li>
                  <li>
                    Payment information (handled securely by our payment
                    processors)
                  </li>
                  <li>Product selection and purchase timestamp</li>
                </ul>
              </div>
              <div>
                <h3 className='text-bold text-xl mb-2'>
                  3.2 Non-Personal Information
                </h3>
                <p className='text-gray'>
                  We may collect anonymous usage data through analytics tools to
                  improve our website and services. This data does not identify
                  individual users.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>
              4. How We Use Your Information
            </h2>
            <ul className='text-gray list-disc pl-6 space-y-2'>
              <li>To deliver purchased products to your email</li>
              <li>To process your payments securely</li>
              <li>To communicate about your order (confirmation, delivery)</li>
              <li>To improve our website and services</li>
              <li>To prevent fraud and ensure security</li>
            </ul>
          </section>

          {/* Product Delivery */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>5. Product Delivery</h2>
            <p className='text-gray'>
              After successful payment, your purchased optimization pack will be
              delivered to the email address provided during checkout. Delivery
              is typically instant but may take up to 24 hours in rare cases.
            </p>
            <div className='mt-4 p-4 bg-[#1a2a36] rounded-xl'>
              <p className='text-gray'>
                <span className='text-white font-semibold'>Note:</span> If you
                don't receive your product within 24 hours, please check your
                spam folder first, then contact us at
                <span className='text-[#00E9E7]'>
                  {" "}
                  support@colzys-tweaks.com
                </span>
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>6. Data Security</h2>
            <p className='text-gray'>
              We implement reasonable security measures to protect your
              information. However, no method of transmission over the Internet
              is 100% secure. Payment information is handled by secure
              third-party processors and is not stored on our servers.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>7. Third-Party Services</h2>
            <p className='text-gray'>
              We use trusted third-party services for:
            </p>
            <ul className='text-gray list-disc pl-6 mt-2 space-y-2'>
              <li>Payment processing (Stripe, PayPal, etc.)</li>
              <li>Email delivery services</li>
              <li>Website analytics</li>
            </ul>
            <p className='text-gray mt-4'>
              These services have their own privacy policies governing your
              data.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>8. Your Rights</h2>
            <p className='text-gray'>You have the right to:</p>
            <ul className='text-gray list-disc pl-6 mt-2 space-y-2'>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>
                Request deletion of your data (subject to legal obligations)
              </li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          {/* Age Restriction */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>9. Age Restriction</h2>
            <p className='text-gray'>
              Our services are not intended for individuals under the age of 16.
              We do not knowingly collect information from children under 16.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>10. Contact Us</h2>
            <p className='text-gray'>
              If you have questions about this Privacy Policy or our practices,
              contact us:
            </p>
            <div className='mt-4 p-4 bg-[#1a2a36] rounded-xl'>
              <p className='text-gray'>
                <span className='text-white font-semibold'>Email:</span>{" "}
                support@colzys-tweaks.com
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className='text-bold text-2xl mb-4'>
              11. Changes to This Policy
            </h2>
            <p className='text-gray'>
              We may update this Privacy Policy periodically. The latest version
              will always be posted on this page with an updated "Last updated"
              date.
            </p>
          </section>

          {/* Disclaimer */}
          <section className='pt-6 border-t border-gray-800'>
            <div className='p-4 bg-gradient-to-r from-[#00E9E7]/10 to-[#00F9A1]/10 rounded-xl'>
              <h3 className='text-bold text-xl mb-2'>Important Disclaimer</h3>
              <p className='text-gray'>
                Colzys Tweaks provides optimization services for gaming systems.
                Results may vary based on individual system configurations. We
                are not responsible for any system instability that may occur
                from improper implementation of our optimization guides. Always
                back up your system before making changes.
              </p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className='mt-10 text-center'>
          <Link href='/' className='btn-primary inline-block'>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
