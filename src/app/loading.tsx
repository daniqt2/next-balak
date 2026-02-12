export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ paddingTop: '64px' }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-charcoal-300 border-t-charcoal-700 animate-spin"
          aria-hidden
        />
        <p className="text-charcoal-600 text-sm font-medium">Cargando…</p>
      </div>
    </div>
  );
}
