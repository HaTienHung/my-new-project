
export function ProductListSkeleton() {
  return (
    <>
      <div className="container mx-auto px-4 py-10 text-[rgb(121,100,73)]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="block bg-white rounded-xl shadow-md overflow-hidden cursor-pointer animate-pulse"
            >
              {/* Skeleton hình ảnh */}
              <div className="relative w-full aspect-square bg-gray-300 rounded-t-xl"></div>

              {/* Skeleton thông tin sản phẩm */}
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden md:col-span-4 animate-pulse`}
    >
      <div className="mb-4 h-6 w-36 rounded-md bg-gray-300" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-300" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-300" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-300" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-300" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-300" />
    </div>
  );
}

export const ProductTableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="hover:bg-gray-50 transition duration-150 animate-pulse">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export const InventoryTableSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          <td className="px-4 py-6">
            <div className="h-4 bg-gray-300 rounded w-5 animate-pulse"></div>
          </td>
          <td className="px-4 py-6">
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          </td>
          <td className="px-4 py-6">
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse "></div>
          </td>
          <td className="px-4 py-6 hidden md:table-cell">
            <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse "></div>
          </td>
        </tr>
      ))}
    </>
  );
};


export const CategoryTableSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-300 rounded w-5"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </td>
          <td className="px-4 py-3 hidden md:table-cell">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </td>
          <td className="px-4 py-3">
            <div className="flex gap-2 justify-center md:justify-start">
              <div className="h-4 bg-gray-300 rounded w-30"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};


export const OrderTableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-6"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </td>
          <td className="px-4 py-4 hidden md:table-cell">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </td>
          <td className="px-4 py-4 hidden md:table-cell">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </td>
          <td className="px-4 py-4 hidden md:table-cell">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-8 sm:w-20"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-gray-300 rounded w-8 sm:w-20"></div>
          </td>
        </tr>
      ))}
    </>
  )
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`animate-pulse relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}
export function RevenueChartSkeleton() {
  return (
    <div className="w-full md:col-span-4 text-[rgb(121,100,73)] animate-pulse">
      <h2 className="mb-4 text-xl md:text-2xl bg-gray-300 h-6 w-48 rounded" />

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-8 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* Y-axis (ẩn ở mobile) */}
          <div
            className="mb-6 hidden flex-col justify-between sm:flex"
            style={{ height: `350px` }}
          >
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="h-4 w-8 bg-gray-200 rounded mb-2"
              />
            ))}
          </div>

          {/* Cột biểu đồ giả */}
          {Array.from({ length: 7 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 w-full">
              <div
                className="w-full bg-gray-300 rounded-md"
                style={{ height: `${40 + Math.random() * 100}px` }}
              />
              <div className="h-3 w-6 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 bg-gray-300 rounded-full" />
          <div className="ml-2 h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}


export function CardSkeleton() {
  return (
    <div
      className={`animate-pulse relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-300" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-300 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-300" />
      </div>
    </div>
  );
}
export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  )
}

export function ProductDetailSkeleton() {
  return (
    <>
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Skeleton Hình ảnh sản phẩm */}
        <div className="flex-1 rounded-lg flex justify-center items-center bg-gray-300 animate-pulse opacity-70 transition-all duration-500 ease-in-out">
          <div className="max-w-[600px] w-full bg-gray-300 p-6 rounded-lg h-[400px]"></div>
        </div>

        {/* Skeleton Thông tin sản phẩm */}
        <div className="w-full md:w-1/3">
          <div className="h-10 bg-gray-300 rounded w-3/4 mb-4 animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>

          {/* Skeleton Số lượng */}
          <div className="flex items-center mt-6">
            <div className="h-4 bg-gray-300 rounded w-20 mr-4 animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
            <div className="flex items-center rounded-lg px-3 py-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
              <div className="w-6 h-6 bg-gray-300 rounded animate-pulse opacity-70 transition-all duration-500 ease-in-out mx-3"></div>
              <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
            </div>
          </div>

          {/* Skeleton Nút mua hàng */}
          <div className="w-full mt-6 h-12 bg-gray-300 rounded-lg animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          <div className="w-full mt-3 h-12 bg-gray-300 rounded-lg animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mt-4 mx-auto animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>

          {/* Skeleton Nút share */}
          <div className="mt-6 flex justify-center">
            <div className="h-6 w-24 bg-gray-300 rounded animate-pulse opacity-70 transition-all duration-500 ease-in-out"></div>
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
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="flex container mb-10">
              {/* Hình ảnh sản phẩm (Skeleton) */}
              <div className="w-20 min-h-[100px] flex flex-col">
                <div className="bg-gray-300 w-full h-full animate-pulse rounded"></div>
                <div className="flex justify-center cursor-pointer mt-2">
                  <div className="bg-gray-300 w-16 h-4 animate-pulse rounded"></div>
                </div>
              </div>

              {/* Thông tin sản phẩm (Skeleton) */}
              <div className="ml-2 flex flex-grow">
                {/* Phần mô tả sản phẩm (Skeleton) */}
                <div className="w-[70%] pr-5">
                  <div className="bg-gray-300 w-full h-5 animate-pulse rounded"></div>
                </div>

                {/* Phần giá và nút tăng giảm (Skeleton) */}
                <div className="w-[30%] flex flex-col items-end">
                  <div className="bg-gray-300 w-24 h-4 animate-pulse rounded mb-4"></div>
                  <div className="flex items-center space-x-2 p-1 rounded-md">
                    {/* Nút Giảm (-) Skeleton */}
                    <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-md"></div>

                    {/* Hiển thị số lượng Skeleton */}
                    <div className="w-12 h-6 bg-gray-300 animate-pulse rounded-md"></div>

                    {/* Nút Tăng (+) Skeleton */}
                    <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-md"></div>
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