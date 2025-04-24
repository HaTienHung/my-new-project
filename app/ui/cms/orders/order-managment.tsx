'use client';
import { useOrders } from "@/app/hooks/useOrders"; // nhớ import đúng path nhé
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import { Order, OrderItem, User } from "@/app/lib/definitions";
import { OrderTableSkeleton } from "@/app/ui/skeletons";
import { useState } from "react";
import UpdateOrderStatusModal from "../../modals/cms/order/updateStatus-modal";
import OrderDetailModal from "../../modals/app/order/orderDetail-modal";
import UserInfoModal from "../../modals/cms/order/userInfo-modal";

export default function OrderManagment() {
  const status = ["pending", "completed", "cancelled"];
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [productsInOrder, setProductsInOrder] = useState<OrderItem[]>([]);
  const [userInfo, setUserInfo] = useState<User>();

  const [isOpenOrderDetail, setIsOpenOrderDetail] = useState(false);
  const [isOpenUserInfo, setIsOpenOpenUserInfo] = useState(false);

  const {
    orders,
    formSearch,
    setFormSearch,
    submitFilters,
    isLoading,
    refetch
  } = useOrders();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFilters();
  };

  const handleEdit = (id: number) => {
    setEditingOrderId(id);
  };
  const openOrderDetailModal = (products: OrderItem[]) => {
    setProductsInOrder(products);
    setIsOpenOrderDetail(true);
  }
  const openUserInfo = (user: User) => {
    setUserInfo(user);
    setIsOpenOpenUserInfo(true);
  }
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-[rgb(121,100,73)]">Quản lí đơn hàng</h1>
      <div className="mb-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
        >
          {/* Chọn trường tìm kiếm */}
          <select
            value={formSearch.searchField}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, searchField: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="">-- Tìm kiếm theo --</option>
            <option value="user.name">Tên khách hàng</option>
            <option value="user.phone_number">Số điện thoại</option>
            <option value="user.address">Địa chỉ</option>
          </select>

          {/* Từ khoá tìm kiếm */}
          <input
            type="text"
            value={formSearch.search}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Tìm kiếm theo tên khách hàng..."
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          />

          {/* Danh mục */}
          <select
            value={formSearch.status}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, status: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="">-- Tất cả trạng thái --</option>
            {status.map((status: string, i: number) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Sắp xếp */}
          <select
            value={formSearch.sortBy}
            onChange={(e) => setFormSearch((prev) => ({ ...prev, sortBy: e.target.value }))}
            className="border border-gray-300 rounded-xl h-10 px-4 text-sm shadow-sm focus:ring-[rgb(121,100,73)] focus:border-[rgb(121,100,73)] w-full"
          >
            <option value="">-- Sắp xếp --</option>
            <option value="+total_price">Tổng tiền tăng dần</option>
            <option value="-total_price">Tổng tiền giảm dần</option>
          </select>

          {/* Nút tìm kiếm */}
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[rgb(121,100,73)] hover:bg-opacity-90 text-white text-sm px-5 py-2 rounded-xl shadow transition-all duration-200 hover:underline cursor-pointer"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
        <div className="sm:col-span-2 flex gap-4 justify-start  ">
          {/* <button
            // onClick={() => setIsCreateModalOpen(true)}
            className=" cursor-pointer bg-[#796449] hover:bg-[#5f4f3a] text-white text-sm px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            Thêm sản phẩm
          </button> */}
          <button
            className=" cursor-pointer bg-white border border-[#796449] text-[#796449] hover:bg-[#f7f4f0] text-sm px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            Export (.xlsx)
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-300 bg-white rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold uppercase text-gray-600">STT</th>
            <th className="px-4 py-2 text-left text-sm font-semibold uppercase text-gray-600 hidden md:table-cell">Mã đơn</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold uppercase text-gray-600">Tên khách hàng</th>
            <th className="px-4 py-2 text-left text-sm font-semibold uppercase text-gray-600 hidden md:table-cell">SĐT</th>
            <th className="px-4 py-2 text-left text-sm font-semibold uppercase text-gray-600 hidden md:table-cell">Địa chỉ</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold uppercase text-gray-600">Trạng thái</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold uppercase text-gray-600">Tổng tiền</th>
            <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold uppercase text-gray-600">Hành động</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <OrderTableSkeleton rows={6} />
          ) : (
            orders.map((order: Order, i: number) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{i + 1}</td>
                <td className="px-4 py-2 text-sm hidden md:table-cell">{order.id}</td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    {order.user.name}
                    <button
                      onClick={() => openUserInfo(order.user)}
                      className="inline-bloack md:hidden"
                    >
                      <FaInfoCircle className="hover:scale-110 transition-transform text-[rgb(121,100,73)]" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm hidden md:table-cell">{order.user.phone_number}</td>
                <td className="px-4 py-2 text-sm hidden md:table-cell">{order.user.address}</td>
                <td className="px-4 py-2 text-sm capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'canceled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-green-600 ">{Number(order.total_price).toLocaleString()} VNĐ</td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className={`flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs md:text-sm border border-blue-600 px-2 py-1 rounded-md transition duration-200
                      ${order.status === 'completed' || order.status === 'cancelled' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={order.status === 'completed' || order.status === 'cancelled'}
                  >
                    <FaEdit className="text-xs md:text-sm" />
                    <span className="hidden sm:inline">Cập nhật</span>
                  </button>
                  <button onClick={() => openOrderDetailModal(order.items)}>
                    <FaInfoCircle className="hover:scale-110 transition-transform text-[rgb(121,100,73)]" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {editingOrderId && (
        <UpdateOrderStatusModal
          id={editingOrderId}
          onClose={() => setEditingOrderId(null)}
          onUpdated={refetch}
        />
      )}
      <OrderDetailModal
        isOpen={isOpenOrderDetail}
        onClose={() => setIsOpenOrderDetail(false)}
        products={productsInOrder}
      />
      <UserInfoModal
        isOpen={isOpenUserInfo}
        onClose={() => setIsOpenOpenUserInfo(false)}
        user={userInfo!}
      />
    </>
  );
}
