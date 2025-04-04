export function ProductListSkeleton() {
  return (
    <>
      <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="block bg-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer animate-pulse"
            >
              {/* Skeleton hình ảnh */}
              <div className="w-full h-48 bg-gray-300"></div>

              {/* Skeleton thông tin sản phẩm */}
              <div className="p-3">
                <div className="h-4 bg-gray-400 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-400 rounded w-3/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function ProductDetailSkeleton() {
  return (
    <>
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Skeleton Hình ảnh sản phẩm */}
        <div className="flex-1 rounded-lg flex justify-center items-center bg-gray-200 animate-pulse opacity-70 transition-all duration-500 ease-in-out">
          <div className="max-w-[600px] w-full bg-gray-200 p-6 rounded-lg h-[400px]"></div>
        </div>

        {/* Skeleton Thông tin sản phẩm */}
        <div className="w-full md:w-1/3">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4 animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>

          {/* Skeleton Số lượng */}
          <div className="flex items-center mt-6">
            <div className="h-4 bg-gray-200 rounded w-20 mr-4 animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
            <div className="flex items-center rounded-lg px-3 py-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse opacity-70 transition-all duration-500 ease-in-out mx-3"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
            </div>
          </div>

          {/* Skeleton Nút mua hàng */}
          <div className="w-full mt-6 h-12 bg-gray-200 rounded-lg animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          <div className="w-full mt-3 h-12 bg-gray-200 rounded-lg animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mt-4 mx-auto animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>

          {/* Skeleton Nút share */}
          <div className="mt-6 flex justify-center">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          </div>
        </div>
      </div>
    </>
  );
}


export function CartItemsSkeleton() {
  return (
    <>
      <div className="mx-auto max-w-2xl bg-gray-100 rounded">
        <section className="px-8 py-4">
          <h1 className="text-center text-3xl font-semibold animate-pulse w-full"></h1>
        </section>

        {/* Danh sách sản phẩm */}
        <section className="py-4 flex flex-col space-y-14 border-t border-b">
          {/* Skeleton loading */}
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex container mb-10">
              {/* Hình ảnh sản phẩm (Skeleton) */}
              <div className="w-20 min-h-[100px] flex flex-col">
                <div className="bg-gray-200 w-full h-full animate-pulse rounded"></div>
                <div className="flex justify-center cursor-pointer mt-2">
                  <div className="bg-gray-200 w-16 h-4 animate-pulse rounded"></div>
                </div>
              </div>

              {/* Thông tin sản phẩm (Skeleton) */}
              <div className="ml-2 flex flex-grow">
                {/* Phần mô tả sản phẩm (Skeleton) */}
                <div className="w-[70%] pr-5">
                  <div className="bg-gray-200 w-full h-5 animate-pulse rounded"></div>
                </div>

                {/* Phần giá và nút tăng giảm (Skeleton) */}
                <div className="w-[30%] flex flex-col items-end">
                  <div className="bg-gray-200 w-24 h-4 animate-pulse rounded mb-4"></div>
                  <div className="flex items-center space-x-2 p-1 rounded-md">
                    {/* Nút Giảm (-) Skeleton */}
                    <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-md"></div>

                    {/* Hiển thị số lượng Skeleton */}
                    <div className="w-12 h-6 bg-gray-200 animate-pulse rounded-md"></div>

                    {/* Nút Tăng (+) Skeleton */}
                    <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  )
}