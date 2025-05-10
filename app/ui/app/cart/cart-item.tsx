import { Product } from "@/app/lib/definitions";
import { setItemQuantity } from "@/app/lib/redux/cart-slice";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlus, FaMinus, FaTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";

export type CartItemType = {
  id: number;
  product: Product;
  quantity: number;
};

type Props = {
  item: CartItemType;
  onDelete: (productId: number) => void;
  onChangeQuantity: (productId: number, newQuantity: number) => void;
  updateCartOnServer: (productId: number, quantity: number) => Promise<{ success: boolean, message: string }>;
  error?: string;
  onSetError: (productId: number, message: string) => void;
  deletingId: number | null;
};

const CartItem = ({
  item,
  onDelete,
  onChangeQuantity,
  updateCartOnServer,
  error,
  onSetError,
  deletingId
}: Props) => {
  const [tempQuantity, setTempQuantity] = useState(item.quantity);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const validQuantityRef = useRef<number>(item.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    setTempQuantity(item.quantity); // Sync lại khi prop thay đổi từ server
    validQuantityRef.current = item.quantity;
  }, [item.quantity]);

  const handleIncrease = () => {
    const newQuantity = tempQuantity + 1;
    setTempQuantity(newQuantity);
    debounceUpdate(newQuantity); // Chạy debounce để giảm số lần gọi API
  };

  const handleDecrease = () => {
    if (tempQuantity <= 1) return;
    const newQuantity = tempQuantity - 1;
    setTempQuantity(newQuantity);
    debounceUpdate(newQuantity); // Chạy debounce để giảm số lần gọi API
  };

  const debounceUpdate = (newQuantity: number) => {
    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

    updateTimeoutRef.current = setTimeout(async () => {
      const result = await updateCartOnServer(item.product.id, newQuantity);

      if (result.success) {
        // Chỉ dispatch action khi cập nhật thành công trên server
        validQuantityRef.current = newQuantity;
        onChangeQuantity(item.product.id, newQuantity); // Cập nhật số lượng trong state của component cha

        // Dispatch cập nhật số lượng sau khi server chấp nhận thay đổi
        dispatch(setItemQuantity({
          product_id: item.product.id,
          quantity: newQuantity
        }));
        onSetError(item.product.id, result.message);

      } else {
        // Rollback UI nếu cập nhật thất bại
        setTempQuantity(validQuantityRef.current);

        onSetError(item.product.id, result.message);
      }
    }, 1000);

  };

  return (
    <>
      <div className="flex container mx-auto mb-5">
        {/* Hình ảnh */}
        <div className="w-20 min-h-[100px] flex flex-col flex-shrink-0">
          <Image
            src={item.product.image_url}
            alt={item.product.name || "Product image"}
            width={80}
            height={80}
            className="border rounded border-solid border-primary aspect-square"
          />
          <div className="flex justify-center  mt-2 ">
            <button
              onClick={() => onDelete(item.product.id)}
              className="flex items-center text-sm sm:text-base box-border cursor-pointer "
              disabled={item.product.id !== deletingId && deletingId !== null}
            >
              <FaTrashCan className="mr-2" />
              Xóa
            </button>
          </div>
        </div>

        {/* Thông tin */}
        <div className="ml-2 flex flex-grow">
          <div className="w-[70%] pr-4">
            <h1 className="font-bold text-sm sm:text-lg leading-tight">
              {item.product.name}
            </h1>
          </div>
          <div className="w-[30%] flex flex-col items-end">
            <h1 className="mb-4 font-light text-sm sm:text-base">
              {Number(item.product.price).toLocaleString()} VNĐ
            </h1>
            <div className="flex items-center space-x-1 sm:space-x-2 border sm:p-1 rounded-md">
              {/* Giảm */}
              <button
                className={`w-8 h-8 flex items-center justify-center rounded-md transition ${tempQuantity <= 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                  : "hover:bg-gray-200"
                  }`}
                onClick={handleDecrease}
                disabled={tempQuantity <= 1}
                title={tempQuantity <= 1 ? "Số lượng tối thiểu là 1" : ""}
              >
                <FaMinus className="text-sm" />
              </button>

              {/* Số lượng */}
              <span className="text-sm sm:text-lg font-semibold flex justify-center w-4">
                {tempQuantity}
              </span>

              {/* Tăng */}
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200"
                onClick={handleIncrease}
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
          </div>

        </div>
      </div>
      {error && (
        error && <p className="text-red-500 text-sm">{error}</p>
      )}
    </>
  );
};

export default CartItem;
