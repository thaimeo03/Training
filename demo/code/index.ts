abstract class Payment {
  abstract pay(): void;
}

export class Paypal extends Payment {
  pay(): void {
    console.log('Paypal');
  }
}

export class ApplePay extends Payment {
  pay(): void {
    console.log('ApplePay');
  }
}

// Add new method
export class Point extends Payment {
  pay(): void {
    console.log('Point');
  }
}

export enum PAYMENT_METHOD {
  PAYPAL = 'paypal',
  APPLE_PAY = 'applePay',
  POINT = 'point'
} 

export class PaymentService {
  private payments: Record<string, Payment> = {}

  registerPayment({method, payment}: {method: PAYMENT_METHOD, payment: Payment}) {
    this.payments[method] = payment;
  }

  pay(method: PAYMENT_METHOD): void {
    const currentPayment = this.payments[method]

    if(currentPayment) {
      currentPayment.pay()
    }
    else {
      console.log("No payment method");
    }
  }
}