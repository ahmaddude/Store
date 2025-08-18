import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";

const ProductItem = ({ product, onQuantityChange, onRemoveFromCart }) => {
  const { product: prod } = product;

  return (
    <tr className="border-b border-gray-200">
      <td className="px-6 py-4 w-7/12">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img className="w-10 h-10 rounded" src={prod.image} alt={prod.name} />
          </div>
          <div className="ml-4">
            <div className="text-sm text-gray-900 font-semibold overflow-hidden overflow-ellipsis">
              {prod.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-black font-semibold">
        ${prod.price}
      </td>
      <td className="px-6 py-4 text-sm text-black font-semibold">
        <div className="flex items-center">
          <button
            className="mr-2 text-black bg-slate-200 rounded-full h-5 w-[20px]"
            onClick={() => onQuantityChange(prod._id, "decrement")}
          >
            -
          </button>
          {product.quantity}
          <button
            className="ml-2 text-black w-[20px] h-5 rounded-full bg-[#e2e8f0]"
            onClick={() => onQuantityChange(prod._id, "increment")}
          >
            +
          </button>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-black font-semibold">
        ${prod.price * product.quantity}
      </td>
      <td className="px-6 py-4 text-right text-sm font-medium">
        <button
          className="text-gray-500"
          onClick={() => onRemoveFromCart(prod._id)}
        >
          x
        </button>
      </td>
    </tr>
  );
};

const CartPage = () => {
  const { cartProducts, getCartProducts, checkout, url, updateQuantity, removeFromCart } =
    useCartStore();
  const { order } = useOrderStore();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  if (!cartProducts || cartProducts.length === 0) {
    return <div className="text-white text-center">Your cart is empty</div>;
  }

  const totalCount = cartProducts.reduce(
    (acc, p) => acc + p.quantity,
    0
  );
  const totalPriceOfItems = cartProducts.reduce(
    (acc, p) => acc + p.quantity * p.product.price,
    0
  );

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await checkout();
      await order();
      if (url) {
        window.location.href = url;
      } else {
        console.error("URL not found");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleQuantityChange = (productId, operation) => {
    updateQuantity(productId, operation); // should exist in your store
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId); // should exist in your store
  };

  return (
    <div className="flex flex-col bg-[#F4F7FA] min-h-screen p-10">
      <div className="text-center mb-5">
        <h1 className="font-semibold pt-8 pb-6 text-4xl">Your cart</h1>
        <p className="text-base pb-7">{totalCount} items in your cart</p>
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-[775px] rounded-xlg">
          <table className="max-w-[775px] w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cartProducts.map((p) => (
                <ProductItem
                  key={p.product._id}
                  product={p}
                  onRemoveFromCart={handleRemoveFromCart}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </tbody>
          </table>

          <footer className="flex justify-between">
            <button
              type="button"
              className="justify-center self-start px-6 py-3 mt-9 font-bold tracking-tight leading-8 text-center text-gray-900 bg-white rounded-lg"
              onClick={() => (window.location.href = "/")}
            >
              Continue Shopping
            </button>
            <div className="flex flex-col px-5 py-4 mt-9 mb-9 text-lg bg-white max-w-[350px] rounded-lg">
              <div className="flex gap-5 justify-between">
                <div className="flex flex-col tracking-normal text-gray-900 leading-[171%] text-base">
                  <div className="text-xs font-bold tracking-widest uppercase">
                    Order Details
                  </div>
                  <div className="mt-12 text-base">{totalCount} items</div>
                  <div className="mt-7 text-base">Delivery Fee</div>
                </div>
                <div className="flex flex-col self-end mt-14 text-right whitespace-nowrap text-base">
                  <div className="font-bold text-gray-900">
                    ${totalPriceOfItems}
                  </div>
                  <div className="mt-6 font-medium text-emerald-400">FREE</div>
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-7 font-bold tracking-tight leading-8 text-gray-900 text-lg">
                <div className="my-auto">Total Price</div>
                <div className="text-right">${totalPriceOfItems}</div>
              </div>
              <button
                className="justify-center items-center px-8 py-3 mt-7 tracking-tight text-center text-white bg-indigo-600 rounded-lg text-base font-semibold"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Checking out..." : "Proceed to checkout"}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
