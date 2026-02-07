import FeatureCard from "./FeatureCard";

const Feature = () => {
  const feature = [
    {
      name: "Basic Optimization",
      item: [
        "NVIDIA/AMD control panel sanity fixes",
        "Remove basic bloatware & startup apps",
        "Keyboard & mouse input tweaks",
        "Driver check + Windows update pass",
      ],
    },
    {
      name: "Extreme Pack",
      item: [
        "FPS-first in‑game presets and render settings",
        "Advanced GPU panel profile (power, low‑latency)",
        "Network stack tune (DNS, QoS, MTU) for lower ping",
        "Scheduler, timer, and shader‑cache optimizations",
      ],
    },
    {
      name: "Full Optimization",
      item: [
        "Full system debloat focused on maximum performance",
        "Optimized power plan for peak efficiency and stability",
        "Highly effective GPU & CPU performance tuning",
        "Per‑game profiles built for competitive FPS",
        "Network optimization for lower latency and faster speeds",
      ],
    },
  ];
  return (
    <div id='feature' className='py-6 px-6'>
      <h1 className='text-bold  text-3xl'>What We Tweak</h1>

      <div className='lg:flex space-y-8 justify-center gap-8 mt-8 '>
        {feature.map((feature, idx) => (
          <FeatureCard feature={feature} key={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
