export class Pizza {
    private _type: PizzaType | null = null;
    private _form: PizzaForm | null = null;
    private _size: PizzaSize | null = null;
    private _supplements: PizzaSupplement [] = [];

    set type(value: PizzaType | null) {
        this._type = value;
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

    public toString(): string {
        const type = this._type !== null ? `Type: ${PizzaType[this._type]}, ` : '';
        const form = this._form !== null ? `Form: ${PizzaForm[this._form]}, ` : '';
        const size = this._size !== null ? `Size: ${PizzaSize[this._size]}, ` : '';
        const supplements = this._supplements.length > 0 ? `Supplements: ${this._supplements.map(supplement => PizzaSupplement[supplement]).join(', ')}` : '';

        const result = `Pizza: ${type}${form}${size}${supplements}`;
        console.log(result);

        return result
    }
}

export enum PizzaForm {
    ROUND,
    SQUARE
}

export enum PizzaSize {
    SMALL,
    MEDIUM,
    HUGE
}

export enum PizzaType {
    PEPPERONI,
    HUNTER,
    MEAT_AND_CHEESE
}

export enum PizzaSupplement {
    SAUCE,
    MUSHROOMS,
    ONION
}

export interface IPizzaBuilder {
    reset(): void;

    setType(type: PizzaType): PizzaBuilder;

    setForm(form: PizzaForm): PizzaBuilder;

    setSize(size: PizzaSize): PizzaBuilder;

    setSupplement(supplement: PizzaSupplement): PizzaBuilder;
}

export class PizzaBuilder implements IPizzaBuilder {
    public pizza!: Pizza;

    constructor() {
        this.reset();
        return this;
    }

    reset() {
        this.pizza = new Pizza();
    }

    setType(type: PizzaType): PizzaBuilder {
        this.pizza.type = type;
        return this;
    }


    setForm(form: PizzaForm): PizzaBuilder {
        this.pizza.form = form;
        return this;
    }

    setSize(size: PizzaSize): PizzaBuilder {
        this.pizza.size = size;
        return this;
    }

    setSupplement(supplement: PizzaSupplement): PizzaBuilder {
        this.pizza.addSupplements(supplement);
        return this;
    }

    public getPizza(): Pizza {
        const result = this.pizza;
        this.reset();
        return result;
    }
}

//реалізація з классом Директор
export class PizzaDirector {
    private builder: PizzaBuilder;

    constructor(builder: PizzaBuilder) {
        this.builder = builder;
    }

    buildHunterPizza(): Pizza {
        return this.builder
            .setType(PizzaType.HUNTER)
            .setSize(PizzaSize.MEDIUM)
            .setForm(PizzaForm.ROUND)
            .setSupplement(PizzaSupplement.ONION)
            .setSupplement(PizzaSupplement.SAUCE)
            .setSupplement(PizzaSupplement.SAUCE)
            .getPizza();
    }
}

//Клієнтський код:
const pepperoni = new PizzaBuilder();

//дефолтна пеппероні
pepperoni.getPizza().toString();

pepperoni
    .setType(PizzaType.PEPPERONI)
    .setForm(PizzaForm.ROUND)
    .setSize(PizzaSize.SMALL)
    .setSupplement(PizzaSupplement.MUSHROOMS)
    .setSupplement(PizzaSupplement.ONION)
    .setSupplement(PizzaSupplement.SAUCE)
    .getPizza()
    .toString();

const meatAndCheese = new PizzaBuilder();
meatAndCheese
    .setType(PizzaType.MEAT_AND_CHEESE)
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
const hunterPizza = new PizzaDirector(new PizzaBuilder()).buildHunterPizza();
hunterPizza.toString();