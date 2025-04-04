import Image from 'next/image';
import Link from "next/link";

export default function ProductList({ products }: { products: any[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`} className="block">
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-xl group">

              {/* Hình ảnh sản phẩm */}
              <div className="relative w-full aspect-[4/3] bg-gray-200">
                <Image
                  alt="none"
                  src="https://13demarzo.net/cdn/shop/files/FR25X18551.png?v=1742525628&width=600"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>

              {/* Thông tin sản phẩm */}
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate group-hover:underline underline-offset-4 transition-all duration-200">
                  {product.name}
                </h2>
                <p className="text-xl font-extralight mt-2">{product.price} VNĐ</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
