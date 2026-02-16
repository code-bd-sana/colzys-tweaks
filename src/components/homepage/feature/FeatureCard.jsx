const FeatureCard = ({ feature }) => {
  return (
    <div className='bg-[#0F1B24] border border-[#1E2D38] rounded-2xl p-6 transition-all duration-300 hover:border-[#00E9E7]/30'>
      {/* Header */}
      <div className='flex items-center gap-3 pb-4 mb-4 border-b border-[#1E2D38]'>
        <div className='flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-[#00E9E7] to-[#00F9A1]'>
          <svg
            className='w-5 h-5 text-black'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={3}
              d='M5 13l4 4L19 7'
            />
          </svg>
        </div>
        <h1 className='font-semibold text-xl text-[#E9F3E3]'>{feature.name}</h1>
      </div>

      {/* Feature List */}
      <ul className='space-y-4'>
        {feature?.item?.map((item, idx) => (
          <li key={idx} className='flex items-start gap-3'>
            <span className='flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-[#00E9E7] to-[#00F9A1]'></span>
            <span className='text-white text-[16px] leading-relaxed'>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
