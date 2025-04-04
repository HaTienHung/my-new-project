import { FaShoppingCart } from "react-icons/fa";
export default function CartQuantity() {
  return (
    <button>
      <a href="/cart" className="relative text-lg transition-transform duration-300 hover:scale-110">
        <FaShoppingCart />
        <span className="absolute -top-2 -right-2 text-white bg-[rgb(121,100,73)] text-xs px-1 rounded-full">
          {/* {cartItemCount ?? 0} */}
        </span>
      </a>
    </button>
  )
};
