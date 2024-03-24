{
    interface Book {
        id: number;
        title: string;
        author: string;
        available: boolean;
    }

    interface Author {
        name: string,
        age: number,
        email: string
    }

    //1. Об'явіть аліас типу BookRequiredFields, використовуючи інтерфейс Book та утиліту Required.
    type BookRequiredFields = Required<Book>;

    //2. Об'явіть змінну bookRequiredFields типу BookRequiredFields та присвойте їй відповідний об'єкт.
    const bookRequiredFields: BookRequiredFields = {
        id: 5,

        title: 'Colors, Backgrounds, and Gradients',

        author: 'Eric A. Meyer',

        available: true,
    }

    //3. Об'явіть аліас типу UpdatedBook, використовуючи інтерфейс Book та утиліту Partial.
    type UpdatedBook = Partial<Book>;

    //4. Об'явіть змінну updatedBook типу UpdatedBook і присвойте їй відповідний об'єкт.
    const updatedBook: UpdatedBook = {
        id: 6,

        title: 'Colors'
    }

    //5. Об'явіть аліас типу AuthorWoEmail, використовуючи інтерфейс Author та утиліту Omit.
    type AuthorWoEmail = Omit<Author, "email">;
    const author: Author = {
        name: "Name",
        age: 45,
        email: "test@mail.com"
    }

    const authorWithoutEmail: AuthorWoEmail = {
        name: author.name,
        age: author.age
    };

    console.log(authorWithoutEmail);

    //6. Об'явіть аліас CreateCustomerFunctionType для функціонального типу функції createCustomer(). Функція приймає рядок і число і повертає їх конкатенацію.
    function createCustomer(string: string, num: number): string {
        return string + num.toString();
    }

    type CreateCustomerFunctionType = typeof createCustomer;

    //7. Об'явіть змінну params, використовуючи аліас типу CreateCustomerFunctionType і утиліту Parameters, викличте функцію createCustomer(), передавши змінну params.
    type Params = Parameters<CreateCustomerFunctionType>;
    const params: Params = ["Customer", 123];
    const result = createCustomer(...params);
    console.log(result);

    //8. Об'явіть аліас fn для функціонального типу функції, яка приймає три параметри з типами string, number, boolean і повертає тип symbol.
    type fn = (param1: string, param2: number, param3: boolean) => symbol;

    const myFunction: fn = (param1, param2, param3) => {
        return Symbol();
    };

    const fnEx = myFunction("", 2, true);
    console.log(fnEx);

    //9. Об'явіть аліаси типів Param1<T>, Param2<T>, Param3<T>, які повертають тип першого, другого та третього параметрів функції відповідно.
    type Param1<T> = T extends (param1: infer P1, param2: any, param3: any) => any ? P1 : never;
    type Param2<T> = T extends (param1: any, param2: infer P2, param3: any) => any ? P2 : never;
    type Param3<T> = T extends (param1: any, param2: any, param3: infer P3) => any ? P3 : never;

    type Param1Type = Param1<typeof myFunction>; // string
    type Param2Type = Param2<typeof myFunction>; // number
    type Param3Type = Param3<typeof myFunction>; // boolean

    //10. Об'явіть аліаси P1, P2, P3 та отримайте типи першого, другого та третього параметрів типу fn.
    type P1<T> = Param1<T>;
    type P2<T> = Param2<T>;
    type P3<T> = Param3<T>;

    type FirstParamType = P1<fn>;  // string
    type SecondParamType = P2<fn>; // number
    type ThirdParamType = P3<fn>;  // boolean

    //11. Створіть утиліти RequiredProps<T> та OptionalProps<T>, які повертають union тип required та optional
    // властивостей об'єкта. Використовуйте mapped type для перебору ключів T та conditional type для
    // трансформації значень ключів типу T. Додайте загальне обмеження для T розширивши його від типу
    // object у RequiredProps та OptionalProps.
    type RequiredProps<T extends object> = {
        [K in keyof T]-?: T[K];
    };

    type OptionalProps<T extends object> = {
        [K in keyof T]?: T[K];
    };

    const requiredProps: RequiredProps<{ age: number, name: string }> = {age: 55, name: "Name"};
    const optionalProps: OptionalProps<{}> = {};

    //12. Об'явіть аліас типу BookRequiredProps та BookOptionalProps, використовуючи інтерфейс Book та утиліти
    // RequiredProps та OptionalProps. Спробуйте замість Book передати примітивний тип.
    type BookRequiredProps = RequiredProps<Book>;
    type BookOptionalProps = OptionalProps<Book>;
    // type BookRequiredPropsPrimitive = OptionalProps<number>; Помилка
    // type BookOptionalPropsPrimitive = OptionalProps<string>; Помилка

    //13. Створіть утиліту RemoveProps <T extends object, TProps extends keyof T>, яка видаляє властивості TProps з переданого типу T.
    type RemoveProps<T extends object, TProps extends keyof T> = {
        [K in keyof T as K extends TProps ? never : K]-?: T[K];
    }

    type WithoutAvailable = RemoveProps<Book, "available">;
    const a: WithoutAvailable = {
        id: 1,
        title: "title",
        // available: true, помилка
        author: "author"
    }

    //14.Об'явіть аліас типу BookRequiredPropsType та BookOptionalPropsType, використовуючи інтерфейс Book, аліаси типу
    // BookRequiredProps та BookOptionalProps та утиліту RemoveProps Спробуйте замість Book передати Author.
    type BookRequiredPropsType = keyof Book;
    type BookOptionalPropsType = never;

    type WithoutAge = RemoveProps<Author, "age">;
    const b: WithoutAge = {
        name: "Name",
        // age: 14, помилка
        email: "email"
    }

    //15.Створіть функцію update(), яка приймає один параметр типу boolean. Якщо значення аргументу true, функція повинна
    // повертати значення типу string. Якщо значення аргументу false, функція повинна повертати значення типу number.
    function update(flag: boolean): string | number {
        return flag ? "" : 1;
    }

    const str = update(true);
    console.log(typeof str);

    const num = update(false);
    console.log(typeof num);
}