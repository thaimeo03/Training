"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
var Main = /** @class */ (function () {
    function Main() {
        this.paymentService = new code_1.PaymentService();
    }
    Main.prototype.solve = function () {
        this.paymentService.registerPayment({
            method: code_1.PAYMENT_METHOD.APPLE_PAY,
            payment: new code_1.ApplePay()
        });
        this.paymentService.pay(code_1.PAYMENT_METHOD.PAYPAL);
    };
    return Main;
}());
new Main().solve();
