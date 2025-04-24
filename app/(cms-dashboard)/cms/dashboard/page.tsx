'use client';


import CardWrapper from "@/app/ui/cms/dashboard/cards";
import LatestInvoices from "@/app/ui/cms/dashboard/lastest-invoices";
import RevenueChart from "@/app/ui/cms/dashboard/revenue-chart";
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
export const dynamic = "force-dynamic";


export default function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl text-[rgb(121,100,73)]">Tổng quan</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />} >
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />} >
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}