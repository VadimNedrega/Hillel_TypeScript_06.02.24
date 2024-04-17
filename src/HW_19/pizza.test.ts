const {PizzaType, PizzaForm, PizzaSize, PizzaSupplement, PizzaBuilder, PizzaDirector } = require('./pizza');

describe('Pizza Builder', () => {
    test('should be Pepperoni Pizza toString value', () => {
        const pepperoni = new PizzaBuilder()
            .setType(PizzaType.PEPPERONI)
            .setForm(PizzaForm.ROUND)
            .setSize(PizzaSize.SMALL)
            .setSupplement(PizzaSupplement.MUSHROOMS)
            .setSupplement(PizzaSupplement.ONION)
            .setSupplement(PizzaSupplement.SAUCE)
            .getPizza();

        expect(pepperoni.toString()).toBe('Pizza: Type: PEPPERONI, Form: ROUND, Size: SMALL, Supplements: MUSHROOMS, ONION, SAUCE');
    });

    test('should be Meat and Cheese Pizza toString value', () => {
        const meatAndCheese = new PizzaBuilder()
            .setType(PizzaType.MEAT_AND_CHEESE)
            .setSize(PizzaSize.HUGE)
            .setForm(PizzaForm.SQUARE)
            .setSupplement(PizzaSupplement.ONION)
            .setSupplement(PizzaSupplement.ONION)
            .setSupplement(PizzaSupplement.ONION)
            .getPizza();

        expect(meatAndCheese.toString()).toBe('Pizza: Type: MEAT_AND_CHEESE, Form: SQUARE, Size: HUGE, Supplements: ONION, ONION, ONION');
    });

    test('should be Hunter Pizza toString value', () => {
        const hunterPizza = new PizzaDirector(new PizzaBuilder()).buildHunterPizza();

        expect(hunterPizza.toString()).toBe('Pizza: Type: HUNTER, Form: ROUND, Size: MEDIUM, Supplements: ONION, SAUCE, SAUCE');
    });

    test('Reset Builder State', () => {
        const builder = new PizzaBuilder()
            .setType(PizzaType.PEPPERONI)
            .setForm(PizzaForm.ROUND)
            .setSize(PizzaSize.SMALL)
            .setSupplement(PizzaSupplement.MUSHROOMS);

        builder.reset();
        const pizza = builder.getPizza();

        expect(pizza.toString()).toBe('Pizza: ');
    });
});