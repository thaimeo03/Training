import { ApplePay, PAYMENT_METHOD, PaymentService } from "./code"
import { leetCode } from "./leetcode"

class Main {
  paymentService = new PaymentService()

  solve() {
    this.paymentService.registerPayment({
      method: PAYMENT_METHOD.APPLE_PAY,
      payment: new ApplePay()
    })
    this.paymentService.pay(PAYMENT_METHOD.PAYPAL)
  }
}

new Main().solve()