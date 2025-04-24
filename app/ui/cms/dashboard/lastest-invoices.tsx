'use client'
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { HiArrowPath } from 'react-icons/hi2';
import { LatestInvoicesSkeleton } from '../../skeletons';
import Cookies from "js-cookie";


type Invoice = {
  id: number;
  total_price: number;
  status: string;
  created_at: string; // hoặc Date nếu bạn parse
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export default function LatestInvoices() {
  const [latestInvoices, setLatestInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchLatestInvoices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/dashboard/latest-invoices`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Cookies.get("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu!");
        }

        const data = await response.json();
        setLatestInvoices(data?.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestInvoices();
  }, []);

  if (isLoading) return <LatestInvoicesSkeleton />

  return (
    <div className="flex w-full flex-col md:col-span-4 text-[rgb(121,100,73)]">
      <h2 className={`mb-4 text-xl md:text-2xl`}>
        Danh sách đơn hàng mới nhất
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/197/197473.png"
                    alt={`s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.user.name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {invoice.user.email}
                    </p>
                  </div>
                </div>
                <p
                  className={`truncate text-sm font-medium md:text-base`}
                >
                  {Number(invoice.total_price).toLocaleString()} VNĐ
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <HiArrowPath className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
