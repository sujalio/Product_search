import { useState } from 'react'

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 60000 },
  { id: 2, name: 'Headphones', category: 'Electronics', price: 2000 },
  { id: 3, name: 'T-shirt', category: 'Clothing', price: 800 },
  { id: 4, name: 'Shoes', category: 'Clothing', price: 2500 },
  { id: 5, name: 'Coffee Mug', category: 'Home', price: 300 },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const categoryBadgeClass = {
    Electronics: 'badge-soft-info',
    Clothing: 'badge-soft-success',
    Home: 'badge-soft-warning',
  }

  const formatInr = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <main className="relative isolate mx-auto min-h-screen w-full max-w-6xl overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="bg-orb bg-orb-one" aria-hidden="true" />
      <div className="bg-orb bg-orb-two" aria-hidden="true" />

      <section className="card">
        <div className="card-inner">
          <header className="animate-fade-in">
            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
              Catalog Explorer
            </span>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">Product Search</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              A fast, clean interface to find products by name and narrow results with category
              filters.
            </p>
          </header>

          <section className="mt-7 grid gap-3 sm:grid-cols-2">
            <article className="stat-card animate-fade-in" style={{ animationDelay: '80ms' }}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Visible Products</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{filteredProducts.length}</p>
            </article>
            <article className="stat-card animate-fade-in" style={{ animationDelay: '140ms' }}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected Category</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{selectedCategory}</p>
            </article>
          </section>

          <section className="mt-7 grid gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 md:grid-cols-2 md:p-5 animate-fade-in" style={{ animationDelay: '260ms' }}>
            <div className="flex flex-col gap-2">
              <label htmlFor="search" className="field-label">
                Search Product
              </label>
              <input
                id="search"
                type="text"
                placeholder="Type product name..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="field-input"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="field-label">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="field-input"
              >
                <option value="All">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
              </select>
            </div>
          </section>

          {filteredProducts.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-7 text-center font-semibold text-amber-700 animate-fade-in">
              No products found
            </p>
          ) : (
            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product, index) => (
                <article
                  className="product-card lift animate-up"
                  style={{ animationDelay: `${320 + index * 70}ms` }}
                  key={product.id}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-slate-900">{product.name}</h2>
                    <span className={categoryBadgeClass[product.category]}>{product.category}</span>
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">{product.category}</p>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{formatInr(product.price)}</p>
                </article>
              ))}
            </section>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
