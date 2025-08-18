import { useOrderStore } from "../store/orderStore";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Package, CreditCard, Calendar, Clock } from "lucide-react";

const OrderPage = () => {
  const { getOrders, orders } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (!orders || orders.length === 0) {
    return (
      <div className="text-white text-center mt-10 text-xl font-semibold">
        You don’t have any orders yet 🚀
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 bg-white bg-clip-text text-transparent">
        Your Orders
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg p-6 hover:shadow-blue-500/20 hover:scale-[1.02] transition"
          >
            {/* Order Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-blue-400 font-semibold">
                <Package className="w-5 h-5" />
                <span>Order #{order._id.slice(-6)}</span>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-bold ${
                  order.status === "Delivered"
                    ? "bg-gray-500/20 text-green-400"
                    : order.status === "Pending"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="mb-4 space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-gray-300 text-sm"
                >
                  <span>
                    {item?.product?.name}{" "}
                    <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                  <span className="text-gray-400">
                    ${(item.product?.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-3 space-y-2">
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Total
                </span>
                <span className="font-semibold text-white">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(order.createdAt).toLocaleDateString()}
                <Clock className="w-4 h-4 ml-3" />
                {new Date(order.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
