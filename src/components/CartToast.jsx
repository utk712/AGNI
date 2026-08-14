import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { ShoppingBag } from "./Icons";

function CartToast() {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          className="cart-toast"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <span className="toast-icon">
            <ShoppingBag />
          </span>
          <span className="toast-text">{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartToast;
