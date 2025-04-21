'use client';
import { generateYAxis } from '@/app/lib/utils';

import { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa';
import { RevenueChartSkeleton } from '../../skeletons';


type Revenue = {
  day: string;
  weekday: string;
  revenue: number;
};

export default function RevenueChart() { // Make component async, remove the props
  const [revenue, setRevenue] = useState<Revenue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms/dashboard/revenue`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu!");
        }

        const data = await response.json();
        setRevenue(data?.data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  const chartHeight = 350;
  // NOTE: Uncomment this code in Chapter 7

  const { yAxisLabels, topLabel } = generateYAxis();

  if (isLoading) {
    return <RevenueChartSkeleton />;
  }

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }


  return (
    <div className="w-full md:col-span-4 text-[rgb(121,100,73)]">
      <h2 className={` mb-4 text-xl md:text-2xl`}>
        Doanh thu theo ngày
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-8 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-xs text-[rgb(121,100,73)] sm:flex "
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((day) => (
            <div key={day.day} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * day.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-[rgb(121,100,73)] sm:rotate-0">
                {day.weekday.slice(0, 3)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <FaCalendar className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
