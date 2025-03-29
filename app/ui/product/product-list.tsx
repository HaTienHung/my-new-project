import Link from "next/link";

export default function ProductList({ products }: { products: any[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105">
              <div className="relative w-full h-64">
                {/* <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" /> */}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 mt-1">{product.price} VNĐ</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
