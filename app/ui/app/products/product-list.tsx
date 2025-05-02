import { Product } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from "next/link";


export default function ProductList({ products }: { products: Product[] }) {
  return (
    <>
      <div>
        {/* Kiểm tra nếu không có sản phẩm */}
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg sm:text-xl font-semibold">
              Không tìm thấy sản phẩm.
            </p>
            <p className="text-sm sm:text-base ">
              Hãy thử thay đổi bộ lọc hoặc tìm kiếm khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="block">
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-101 hover:shadow-xl group">
                  {/* Hình ảnh sản phẩm */}
                  <div className="relative w-full aspect-square bg-gray-200  border-b border-b-gray-100">
                    <Image
                      alt="none"
                      src={product.image_url}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="rounded-t-xl"
                    />
                  </div>

                  {/* Thông tin sản phẩm */}
                  <div className="p-4">
                    <h2 className="text-sm sm:text-base lg:text-base xl:text-lg font-semibold truncate group-hover:underline underline-offset-4 transition-all duration-200">
                      {product.name}
                    </h2>
                    <p className="text-base sm:text-xl font-extralight mt-2">{Number(product.price).toLocaleString()} VNĐ</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

