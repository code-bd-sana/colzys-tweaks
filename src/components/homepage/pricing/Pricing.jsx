import PricingCard from "./PricingCard";

const Pricing = () => {
  const pricing = [
    {
      name: "Basic",
      description: "GPU settings fixed, basic debloat, input polish.",
      price: 10,
      item: [
        "Fix NVIDIA/AMD control panel basics",
        "Remove common bloat + disable startup junk",
        "Keyboard & mouse tweaks for steady input",
        "Driver sanity + Windows gaming defaults",
      ],
      buttonText: "Buy Basic",
      buttonLink: "/",
    },
    {
      name: "Extreme Pack",
      description: "Aggressive FPS & latency tune across OS, GPU, network.",
      price: 30,
      item: [
        "Pro GPU panel profile (power, low‑latency, cache)",
        "In‑game competitive presets per title",
        "Network tune (DNS, QoS, congestion control)",
        "Scheduler & timer tweaks for input consistency",
      ],
      buttonText: "Buy Extreme",
      buttonLink: "/",
    },
    {
      name: "Full Optimization",
      description: "Full system debloat focused on maximum performance",
      price: 40, // price not specified, you can adjust
      item: [
        "Optimized power plan for peak efficiency and stability",
        "Highly effective GPU & CPU performance tuning",
        "Per‑game profiles built for competitive FPS",
        "Network optimization for lower latency and faster speeds",
      ],
      buttonText: "Buy Full",
      buttonLink: "/",
      discount: "28% OFF",
    },
  ];

  return (
    <div id='price' className='px-8 mt-8'>
      <h1 className='text-bold'>Simple Pricing</h1>

      <div className='lg:flex gap-4 justify-center space-y-4 mt-8'>
        {pricing?.map((pricing, idx) => (
          <PricingCard pricing={pricing} key={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
