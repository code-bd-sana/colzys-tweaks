"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const packs = [
  { name: "Extreme Pack", price: 30 },
  { name: "Basic Pack", price: 20 },
  { name: "Pro Pack", price: 50 },
];

const CheckOutPage = () => {
  const searchParams = useSearchParams();
  const packParam = searchParams.get("pack");

  const [selectedPack, setSelectedPack] = useState(packs[0]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [region, setRegion] = useState("");

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (packParam) {
      const foundPack = packs.find((p) => packParam.includes(p.name));
      if (foundPack) setSelectedPack(foundPack);
    }
  }, [packParam]);

  useEffect(() => {
    // simple coupon logic
    if (coupon.toLowerCase() === "colzy") {
      setDiscount(2);
    } else {
      setDiscount(0);
    }
  }, [coupon]);

  const total = selectedPack.price - discount;

  const handlePay = async () => {
    try {
      const paymentData = {
        user: { fullName, email, discord, region, notes },
        pack: { name: selectedPack.name, price: selectedPack.price },
        coupon: coupon || null,
        discount,
        total,
      };

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();

      if (data.approveUrl) {
        window.location.href = data.approveUrl; // Redirect user to PayPal
      } else {
        alert("Failed to create PayPal order.");
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 flex justify-center items-start py-10 px-4'>
      <div className='w-full max-w-5xl grid md:grid-cols-2 gap-8 bg-gray-800 rounded-xl p-8'>
        {/* Left - User Details */}
        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Checkout</h2>
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Full name (optional)'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            />
            <input
              type='text'
              placeholder='Discord'
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              className='w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className='w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'>
              <option value='' disabled>
                Select Region...
              </option>
              <option>USA</option>
              <option>Europe</option>
              <option>Asia</option>
            </select>
            <select
              value={selectedPack.name + " — $" + selectedPack.price}
              onChange={(e) => {
                const packName = e.target.value.split(" — ")[0];
                const pack = packs.find((p) => p.name === packName);
                if (pack) setSelectedPack(pack);
              }}
              className='w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'>
              {packs.map((pack) => (
                <option key={pack.name} value={pack.name + " — $" + pack.price}>
                  {pack.name} — ${pack.price}
                </option>
              ))}
            </select>
            <input
              type='text'
              placeholder='Coupon'
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className='w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            />
            <textarea
              placeholder='Notes (PC specs + games)'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className='w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400'
            />
          </div>

          {/* Price summary */}
          <div className='text-white space-y-1'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>${selectedPack.price}</span>
            </div>
            <div className='flex justify-between'>
              <span>Discount</span>
              <span>-${discount}</span>
            </div>
            <div className='flex justify-between font-semibold text-lg'>
              <span>Total</span>
              <span>${total}</span>
            </div>
            {discount > 0 && (
              <p className='text-sm text-gray-300'>
                Use coupon {coupon} for ${discount} off before paying.
              </p>
            )}
          </div>
        </div>

        {/* Right - PayPal */}
        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold text-white'>Pay with PayPal</h2>
          <button
            onClick={handlePay}
            className='w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold py-3 rounded-lg hover:opacity-90 transition'>
            Pay with PayPal
          </button>
          <p className='text-gray-300 text-sm'>
            Popup blocked? This button always works.
          </p>
          <p className='text-gray-300 text-sm'>
            PayPal is blocked by your browser. Enable popups & third-party
            cookies for paypal.com.
          </p>
          <p className='text-gray-300 text-sm'>
            Questions? Email{" "}
            <span className='text-cyan-400'>Himc798@gmail.com</span>
          </p>
          <p className='text-gray-300 text-sm flex gap-3'>
            My Socials: <span>🏠</span> <span>🎵</span> <span>▶️</span>{" "}
            <span>💬</span>
          </p>
          <button className='w-full border border-gray-600 rounded-lg py-2 text-white hover:bg-gray-700 transition'>
            Open PayPal (Redirect)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
