//Builder

{
    class Pizza {
        private readonly _type: PizzaType;
        private _form: PizzaForm | null = null;
        private _size: PizzaSize| null = null;
        private _supplements: PizzaSupplement [] = [];

        constructor(type: PizzaType) {
            this._type = type;
        }

        set form(value: PizzaForm | null) {
            this._form = value;
        }

        set size(value: PizzaSize | null) {
            this._size = value;
        }

        addSupplements(value: PizzaSupplement) {
            this._supplements.push(value);
        }

        public toString(): void {
            const form = this._form !== null ? `Form: ${PizzaForm[this._form]}, ` : '';
            const size = this._size !== null ? `Size: ${PizzaSize[this._size]}, ` : '';
            const supplements = this._supplements.length > 0 ? `Supplements: ${this._supplements.map(supplement => PizzaSupplement[supplement]).join(', ')}` : '';

            console.log(`${PizzaType[this._type]} pizza: ${form}${size}${supplements}`);
        }
    }

    enum PizzaForm {
        ROUND,
        SQUARE
    }

    enum PizzaSize {
        SMALL,
        MEDIUM,
        HUGE
    }

    enum PizzaType {
        PEPPERONI,
        HUNTER,
        MEAT_AND_CHEESE
    }

    enum PizzaSupplement {
        SAUCE,
        MUSHROOMS,
        ONION
    }

    interface PizzaBuilder {
        reset() : void;
        setForm(form: PizzaForm): GeneralPizzaBuilder;
        setSize(size: PizzaSize): GeneralPizzaBuilder;
        setSupplement(supplement: PizzaSupplement): GeneralPizzaBuilder;
    }

    abstract class GeneralPizzaBuilder implements PizzaBuilder {
        protected pizza!: Pizza;

        constructor() {
            this.reset();
        }

        abstract reset() : void;

        setForm(form: PizzaForm): GeneralPizzaBuilder {
            this.pizza.form = form;
            return this;
        }

        setSize(size: PizzaSize): GeneralPizzaBuilder {
            this.pizza.size = size;
            return this;
        }

        setSupplement(supplement: PizzaSupplement): GeneralPizzaBuilder {
            this.pizza.addSupplements(supplement);
            return this;
        }

        public getPizza(): Pizza {
            const result = this.pizza;
            this.reset();
            return result;
        }
    }

    class PepperoniBuilder extends GeneralPizzaBuilder implements PizzaBuilder {
        protected override pizza: Pizza = new Pizza(PizzaType.PEPPERONI);

        public reset(): void {
            this.pizza = new Pizza(PizzaType.PEPPERONI);
        }
    }

    class MeatAndCheeseBuilder extends GeneralPizzaBuilder implements PizzaBuilder {
        protected override pizza: Pizza = new Pizza(PizzaType.MEAT_AND_CHEESE);

        public reset(): void {
            this.pizza = new Pizza(PizzaType.MEAT_AND_CHEESE);
        }
    }

    class HunterBuilder extends GeneralPizzaBuilder implements PizzaBuilder {
        protected override pizza: Pizza = new Pizza(PizzaType.HUNTER);

        public reset(): void {
            this.pizza = new Pizza(PizzaType.HUNTER);
        }
    }

    //реалізація з классом Директор
    class PizzaDirector {
        private builder: GeneralPizzaBuilder;

        constructor(builder: GeneralPizzaBuilder) {
            this.builder = builder;
        }

        buildHunterPizza(): Pizza {
            return this.builder
                .setSize(PizzaSize.MEDIUM)
                .setForm(PizzaForm.ROUND)
                .setSupplement(PizzaSupplement.ONION)
                .setSupplement(PizzaSupplement.SAUCE)
                .setSupplement(PizzaSupplement.SAUCE)
                .getPizza();
        }
    }

    //Клієнтський код:
    const pepperoni = new PepperoniBuilder();

    //дефолтна пеппероні
    pepperoni.getPizza().toString();

    pepperoni
        .setForm(PizzaForm.ROUND)
        .setSize(PizzaSize.SMALL)
        .setSupplement(PizzaSupplement.MUSHROOMS)
        .setSupplement(PizzaSupplement.ONION)
        .setSupplement(PizzaSupplement.SAUCE)
        .getPizza()
        .toString();

    const meatAndCheese = new MeatAndCheeseBuilder();
    meatAndCheese
        .setSize(PizzaSize.HUGE)
        .setForm(PizzaForm.SQUARE)
        .setSupplement(PizzaSupplement.ONION)
        .setSupplement(PizzaSupplement.ONION)
        .setSupplement(PizzaSupplement.ONION)
        .getPizza()
        .toString();

    //повернення до дефолтної
    meatAndCheese.reset();
    meatAndCheese.getPizza().toString();

    //реалізація класу Директор
    const hunterPizza = new PizzaDirector(new HunterBuilder()).buildHunterPizza();
    hunterPizza.toString();
}