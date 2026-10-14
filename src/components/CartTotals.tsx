import { useSelector } from 'react-redux'
import { formatPrice } from '../utils'
import { RootState } from '../store'

const CartTotals = () => {
  const {cartTotal, shipping, tax, grandTotal} = useSelector((state: RootState) => state.cart)

  return (
    <div className="rounded-3xl border border-base-300 bg-base-200 p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold">Order summary</h3>
      <div className="mt-6 space-y-4 text-sm">
        <p className="flex justify-between"><span className="text-base-content/70">Subtotal</span><span className="font-medium">{formatPrice(cartTotal)}</span></p>
        <p className="flex justify-between"><span className="text-base-content/70">Shipping</span><span className="font-medium">{formatPrice(shipping)}</span></p>
        <p className="flex justify-between"><span className="text-base-content/70">Tax</span><span className="font-medium">{formatPrice(tax)}</span></p>
      </div>
      <p className="mt-6 flex items-baseline justify-between border-t border-base-300 pt-6"><span className="font-semibold">Order Total</span><span className="font-display text-2xl font-semibold">{formatPrice(grandTotal)}</span></p>
    </div>
  )
}

export default CartTotals
