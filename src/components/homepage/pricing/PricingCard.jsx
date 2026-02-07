import Link from "next/link";

const PricingCard = ({ pricing }) => {
  return (
    <div
      className={`border rounded-2xl p-6 flex flex-col justify-between 
      ${
        pricing.name === "Extreme Pack"
          ? "border-cyan-400"
          : pricing.name === "Full Optimization"
            ? "border-green-400"
            : "border-gray-700"
      } hover:shadow-lg transition-shadow duration-300`}>
      {/* Badge */}
      {pricing.discount && (
        <div className='text-sm font-semibold text-white mb-2 bg-green-500 px-3 py-1 rounded-full w-max'>
          {pricing.discount}
        </div>
      )}
      {pricing.name === "Extreme Pack" && (
        <div className='text-sm font-semibold text-white mb-2 bg-cyan-500 px-3 py-1 rounded-full w-max'>
          Most Popular
        </div>
      )}

      {/* Plan Name */}
      <h2 className='text-bold mb-2'>{pricing.name}</h2>

      {/* Description */}
      <p className='text-primary mb-4'>{pricing.description}</p>

      {/* Price */}
      <p className='text-highlight mb-4'>${pricing.price}</p>

      {/* Features */}
      <ul className='list-disc list-inside text-gray mb-6 space-y-2'>
        {pricing.item.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      {/* Button */}

      <Link href={pricing.buttonLink} className='btn-primary text-center'>
        {pricing.buttonText}
      </Link>
    </div>
  );
};

export default PricingCard;
