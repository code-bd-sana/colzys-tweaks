import Link from "next/link";

const Navbar = () => {
  return (
    <div className='flex p-4 border border-b-gray-800 items-center justify-between'>
      <section>
        <h4 className='logo'>⚡ Colzys Tweaks</h4>
      </section>
      <section className='flex items-center gap-4'>
        <p className='text-primary hidden md:block'>
          Services Pricing My Socials{" "}
        </p>
        <Link href={"#price"} className='btn-primary'>
          Buy
        </Link>
      </section>
    </div>
  );
};

export default Navbar;
