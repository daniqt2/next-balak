import Image from 'next/image';

export default function ComingSoon() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <Image
        src="/balak-home.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white px-8 py-10 shadow-xl text-center">
        <Image
          src="/icon.svg"
          alt=""
          width={64}
          height={64}
          className="mx-auto mb-4 opacity-90"
          aria-hidden
        />
        <h1 className="font-anton text-4xl sm:text-5xl uppercase tracking-wide text-charcoal-900">
          BALAK RIDE
        </h1>
        <p className="mt-2 text-base sm:text-lg text-charcoal-700 font-medium">
          RUTAS · PUERTOS · CAFÉ
        </p>
        <p className="mt-4 text-lg text-charcoal-600 font-medium">
          Próximamente
        </p>
      </div>
    </div>
  );
}
