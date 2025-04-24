'use client'

import { useEffect, useState } from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaInbox, FaUserGroup } from "react-icons/fa6";
import { CardsSkeleton } from "../../skeletons";
import Cookies from "js-cookie";



const iconMap = {
  revenue: FaRegMoneyBillAlt,
  customers: FaUserGroup,
  orders: FaInbox,
};

export default function CardWrapper() {
  const [dashboardData, setDashboardData] = useState<{
    total_customers: number;
    total_orders: number;
    total_revenue: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/dashboard`, {
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
        setDashboardData(data?.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);


  if (isLoading || !dashboardData) {
    return <CardsSkeleton />;
  }

  const total_customers = dashboardData?.total_customers ?? 0;
  const total_orders = dashboardData?.total_orders ?? 0;
  const total_revenue = dashboardData?.total_revenue ?? 0;

  return (
    <>
      <Card title="Tổng khách hàng" value={total_customers} type="customers" />
      <Card title="Tổng đơn hàng" value={total_orders} type="orders" />
      <Card title="Tổng doanh thu" value={Number(total_revenue).toLocaleString()} type="revenue" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'revenue' | 'orders' | 'customers';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm text-[rgb(121,100,73)]">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5  " /> : null}
        <h3 className="ml-2 text-sm font-medium ">{title}</h3>
      </div>
      <p
        className={`
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl `}
      >
        {value}
      </p>
    </div>
  );
}
