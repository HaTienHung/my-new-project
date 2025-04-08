import { useEffect, useState } from "react";
import { FaFileContract, FaInfoCircle, FaTimes } from "react-icons/fa";
import ProductModal from "@/app/ui/modals/app/productDetail-modal";

type ModalState = "orderList" | "productDetail" | null;

const OrderModal = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<ModalState>(null); // Sử dụng 1 state
  const [productsInOrder, setProductsInOrder] = useState<any[]>([]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app/orders/show`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
  }, []);

  const openProductModal = (products: any[]) => {
    setProductsInOrder(products);
    setModalState("productDetail");
  };

  return (
    <>
      <button
        onClick={() => setModalState("orderList")}
        className="text-[rgb(121,100,73)] text-lg transition-transform duration-300 hover:scale-110"
      >
        <FaFileContract />
      </button>

      {/* Order Modal */}
      {modalState === "orderList" && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[450px] max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Thông tin đơn hàng</h2>
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
                <p className="text-center">Bạn không có đơn hàng nào</p>
              ) : (
                orders.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <table className="w-full border-collapse">
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
                          <td className="p-2 border">{item.total_price}</td>
                          <td className="p-2 border">{item.status}</td>
                          <td className="p-2 border text-center">
                            <button onClick={() => openProductModal(item.items)}>
                              <FaInfoCircle className="hover:scale-110 transition-transform" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={modalState === "productDetail"}
        onClose={() => setModalState("orderList")}
        products={productsInOrder}
      />
    </>
  );
};

export default OrderModal;
