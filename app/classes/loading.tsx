export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50 animate-pulse">
      <div className="bg-white/80 h-16" />
      <div className="bg-primary-900 h-72" />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="h-52 bg-primary-100" />
              <div className="p-6 space-y-3">
                <div className="h-6 bg-stone-200 rounded w-3/4" />
                <div className="h-4 bg-stone-200 rounded w-full" />
                <div className="h-4 bg-stone-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
