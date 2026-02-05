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
          <button className='btn-primary'>See Pricing</button>
          <button className='btn-secondary'>What you get</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
