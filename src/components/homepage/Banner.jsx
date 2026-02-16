import Link from "next/link";

const Banner = () => {
  return (
    <div className='bg-secondary px-6 md:px-12 py-24 '>
      {/* banner text box */}
      <div className='mx-auto space-y-4 text-center'>
        <h1 className='text-highlight'>Game Faster. Run Smoother.</h1>
        <p className='text-gray'>
          Decrease latency. Increase FPS. Lower ping. Clean, safe tweaks for
          competitive gaming.
        </p>

        {/* button */}

        <div className='flex justify-center gap-2'>
          <Link href={"#price"} className='btn-primary'>
            See Pricing
          </Link>
          <Link href={"#feature"} className='btn-secondary'>
            What you get
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
