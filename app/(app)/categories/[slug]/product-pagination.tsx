'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ProductList from '@/app/ui/app/products/product-list'
import Pagination from '@/app/ui/pagination'
import { getProductsByCategory } from '@/app/lib/data'
import { ProductListSkeleton } from '@/app/ui/skeletons'

export default function ClientProductPagination({
  slug,
  initialPage,
  initialProducts,
  initialTotalPages,
}: {
  slug: string
  initialPage: number
  initialProducts: any[]
  initialTotalPages: number
}) {
  const [products, setProducts] = useState(initialProducts)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [isloading, setIsLoading] = useState(false)

  const router = useRouter()

  const searchParams = useSearchParams()
  const queryString = searchParams.toString()

  // Lấy page từ searchParams
  const pageParam = searchParams.get('page')
  const currentPage = pageParam ? parseInt(pageParam) : initialPage

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (currentPage === initialPage && isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setIsLoading(true);
    getProductsByCategory(slug, currentPage).then((res) => {
      setProducts(res.products)
      setTotalPages(res.lastPage)
      setIsLoading(false);
    })
  }, [queryString]) // ← dùng currentPage thay vì searchParams

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`)
  }

  return (
    <>
      {isloading ? <p>Đang tải dữ liệu ...</p> : <ProductList products={products} />}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
