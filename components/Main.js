import Image from "next/image";

export default function Main({ fadeOut }) {
  return (
    fadeOut && (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 opacity-0 animate-fade bg-white">
          <Image
            src="/img/MögeTeeLogo.png"
            alt="hero"
            width={500}
            height={500}
          />
        </div>
      </>
    )
  );
}
