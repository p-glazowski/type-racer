import Image from 'next/image';

export default function Header() {
  return (
    <header className="p-4 flex flex-row justify-between items-center">
      <div>
        {/* MOBILE LOGO */}
        <div className="w-8 md:hidden">
          <Image
            width={32}
            height={32}
            alt="Logo"
            src={'/logo-small.svg'}
            className="w-full h-full object-cover"
          />
        </div>
        {/* PC LOGO */}
        <div className="hidden md:block">
          <Image
            width={267}
            height={40}
            alt="Logo"
            src={'/logo-large.svg'}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <div className="w-5">
          <Image
            width={21}
            height={18}
            alt="Golden cup icon"
            src={'/icon-personal-best.svg'}
            className=""
          />
        </div>
        <p className="text-my-neutral-400">
          Best:
          <span className="uppercase text-white ml-1">92 wpm</span>
        </p>
      </div>
    </header>
  );
}
