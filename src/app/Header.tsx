export default function Header() {
  return (
    <header className="bg-secondary">
      <h1 className="text-center text-4xl font-bold pt-4 pb-2 text-white border-b">PRESUPUESTO</h1>
      <div className="flex items-center justify-center gap-5 py-2">
        <h2 className="text-2xl font-semibold text-white">GLORIA</h2>
        <div className="bg-warning before:bg-secondary after:bg-secondary before:bg-opacity-60 ring ring-borderGlass water h-10 w-10 rounded-full after:bottom-[50%] before:bottom-[50%]" />
      </div>
    </header>
  )
}