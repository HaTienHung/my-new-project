'use client';
import { useEffect, useState } from "react";
import { FaFileContract, FaInfoCircle, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { openAuthModal } from "@/app/lib/redux/authModal-slice";
import OrderDetailModal from "@/app/ui/modals/app/order/orderDetail-modal";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Cookies from "js-cookie";
import { Order, OrderItem } from "@/app/lib/definitions";


type ModalState = "orderList" | "productDetail" | null;

const OrderModal = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<ModalState>(null); // Sử dụng 1 state
  const [productsInOrder, setProductsInOrder] = useState<OrderItem[]>([]);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    if (!isAuthenticated) { console.log('Do not fetch orders'); return };
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/orders/show`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data?.data || []);
      } else {
        const errorData = await res.json();
        console.error("API error:", errorData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated]);

  const openProductModal = (products: OrderItem[]) => {
    setProductsInOrder(products);
    setModalState("productDetail");
  };
  const handleClick = () => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      dispatch(openAuthModal());
      return;
    }
    else {
      setModalState("orderList");
    }
  }
  return (
    <>
      <button
        onClick={() => handleClick()}
        className="text-[rgb(121,100,73)] text-lg transition-transform duration-300 hover:scale-110"
      >
        <FaFileContract />
      </button>

      {/* Order Modal */}
      <Dialog open={modalState === "orderList"} onClose={() => setModalState(null)} className="relative z-50">
        {/* Modal content */}
        <div className="fixed inset-0 flex justify-center items-center p-4">
          <DialogPanel className="bg-white rounded-lg shadow-lg max-w-[90vw] sm:max-w-[450px] p-6">
            <div className="flex justify-between items-center mb-4">
              <DialogTitle className="text-2xl font-semibold text-[rgb(121,100,73)]">Thông tin đơn hàng  </DialogTitle>
              <button onClick={() => setModalState(null)}>
                <FaTimes className="text-gray-600 text-xl hover:text-red-500" />
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-6">
                  <span className="inline-block w-6 h-6 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></span>
                  <p className="mt-2 text-sm text-gray-600">Đang tải đơn hàng...</p>
                </div>
              ) : orders.length === 0 ? (
                <p className="text-center text-[rgb(121,100,73)] ">Bạn không có đơn hàng nào</p>
              ) : (
                orders.map((item: Order) => (
                  <div key={item.id}>
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          <th className="p-2 border">Mã đơn hàng</th>
                          <th className="p-2 border">Tổng tiền</th>
                          <th className="p-2 border">Trạng thái</th>
                          <th className="p-2 border">Chi tiết</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-gray-50">
                          <td className="p-2 border">{item.id}</td>
                          <td className="p-2 border">{Number(item.total_price).toLocaleString()} VNĐ</td>
                          <td className="p-2 border capitalize">{item.status}</td>
                          <td className="p-2 border text-center">
                            <button onClick={() => openProductModal(item.items)}>
                              <FaInfoCircle className="hover:scale-110 transition-transform text-blue-600" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Product Modal */}
      <OrderDetailModal
        isOpen={modalState === "productDetail"}
        onClose={() => setModalState("orderList")}
        products={productsInOrder}
      />
    </>
  );
};

export default OrderModal;
