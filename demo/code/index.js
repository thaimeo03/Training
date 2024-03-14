"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = exports.PAYMENT_METHOD = exports.Point = exports.ApplePay = exports.Paypal = void 0;
var Payment = /** @class */ (function () {
    function Payment() {
    }
    return Payment;
}());
var Paypal = /** @class */ (function (_super) {
    __extends(Paypal, _super);
    function Paypal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paypal.prototype.pay = function () {
        console.log('Paypal');
    };
    return Paypal;
}(Payment));
exports.Paypal = Paypal;
var ApplePay = /** @class */ (function (_super) {
    __extends(ApplePay, _super);
    function ApplePay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplePay.prototype.pay = function () {
        console.log('ApplePay');
    };
    return ApplePay;
}(Payment));
exports.ApplePay = ApplePay;
// Add new method
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Point.prototype.pay = function () {
        console.log('Point');
    };
    return Point;
}(Payment));
exports.Point = Point;
var PAYMENT_METHOD;
(function (PAYMENT_METHOD) {
    PAYMENT_METHOD["PAYPAL"] = "paypal";
    PAYMENT_METHOD["APPLE_PAY"] = "applePay";
    PAYMENT_METHOD["POINT"] = "point";
})(PAYMENT_METHOD || (exports.PAYMENT_METHOD = PAYMENT_METHOD = {}));
var PaymentService = /** @class */ (function () {
    function PaymentService() {
        this.payments = {};
    }
    PaymentService.prototype.registerPayment = function (_a) {
        var method = _a.method, payment = _a.payment;
        this.payments[method] = payment;
    };
    PaymentService.prototype.pay = function (method) {
        var currentPayment = this.payments[method];
        if (currentPayment) {
            currentPayment.pay();
        }
        else {
            console.log("No payment method");
        }
    };
    return PaymentService;
}());
exports.PaymentService = PaymentService;
