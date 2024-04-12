//1. Observer
{
    interface Observer {
        update(data: any): void;
    }

    class Subject {
        private observers: Observer[] = [];

        subscribe(observer: Observer): void {
            this.observers = [...this.observers, observer];
        }

        unsubscribe(observer: Observer): void {
            this.observers = this.observers.filter(obs => obs !== observer);
        }

        notify(data: any): void {
            this.observers.forEach(observer => observer.update(data));
        }
    }

    class StockObserver implements Observer {
        private stockPrice: number = 0;

        update(data: any): void {
            if (typeof data === 'number') {
                this.stockPrice = data;
                console.log(`Stock price updated: ${this.stockPrice}`);
            } else {
                console.error('Invalid data type');
            }
        }
    }

    const subject = new Subject();
    const observer1 = new StockObserver();
    const observer2 = new StockObserver();

    subject.subscribe(observer1);
    subject.subscribe(observer2);

    subject.notify(12);
    subject.notify(15);

    subject.unsubscribe(observer2);
    subject.notify(200);
}

//2. Strategy
{
    interface PaymentStrategy {
        pay(amount: number): void;
    }

    class CreditCardPaymentStrategy implements PaymentStrategy {
        pay(amount: number): void {
            console.log(`Paying ${amount} with Credit Card method.`);
        }
    }

    class PaypalPaymentStrategy implements PaymentStrategy {
        pay(amount: number): void {
            console.log(`Paying ${amount} with Paypal method.`);
        }
    }

    class BitcoinPaymentStrategy implements PaymentStrategy {
        pay(amount: number): void {
            console.log(`Paying ${amount} with Bitcoin method.`);
        }
    }

    class PaymentContext {
        constructor(private _paymentStrategy: PaymentStrategy) {
            this._paymentStrategy = _paymentStrategy;
        }

        executePayment(amount: number): void {
            this._paymentStrategy.pay(amount);
        }

        set paymentStrategy(value: PaymentStrategy) {
            this._paymentStrategy = value;
        }
    }

    const creditCardPayment = new CreditCardPaymentStrategy();
    const payPalPayment = new PaypalPaymentStrategy();
    const bitcoinPayment = new BitcoinPaymentStrategy();
    const paymentContext = new PaymentContext(creditCardPayment);

    paymentContext.executePayment(100);

    paymentContext.paymentStrategy = payPalPayment;
    paymentContext.executePayment(200);

    paymentContext.paymentStrategy = bitcoinPayment;
    paymentContext.executePayment(300);
}