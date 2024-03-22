// 1. DeepReadonly - доступні тільки для читання навіть властивості вкладених обʼєктів.

{
    type DeepReadonly<T> = {
        readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
    }

    const a: DeepReadonly<string> = "string";
    //a.length = 98; Помилка

    const obj: DeepReadonly<{age: number, name: string}> = {age: 23, name: "Name"};
    //obj.age = 34; Помилка

    const nestedObj: DeepReadonly<{nameData : {name: string, surname: string}}> = {nameData : {name: "name", surname: "surname"}}
    //nestedObj.nameData = {name: "new name", surname: "new surname"} Помилка
    //nestedObj.nameData.name = "new name" Помилка
}

// 2. DeepRequireReadonly - доступні тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.

{
    type DeepRequireReadonly<T> = {
        readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
    };

    const nestedRequireObj: DeepRequireReadonly<{age: number, nameData : {name: string, surname?: string}}> = {
        age: 67,
        // nameData : {name : "name"} //Помилка, поле surname в данному випадку обов'язкове, незважаючи на конструкцію surname?
        nameData: {name : "name", surname: "surname"}
    }

    //nestedRequireObj.nameData.surname = 'new' //Помилка, readOnly
}

// 3. UpperCaseKeys - приведення всіх ключів до верхнього регістру.
{
    type UpperCaseKeys<T> = {
        [K in keyof T as Uppercase<string & K>]: T[K]
    };

    const obj: UpperCaseKeys<{age: number, name: string}> = {
        //age: 57, name: "name" //Помилка регістру
        AGE: 57, NAME: "NAME"
    }
}

// 4. ObjectToPropertyDescriptor - приведення звичайного обʼєкта на обʼєкт де кожне `value` є дескриптором.
{
    type ObjectToPropertyDescriptor<T> = {
        [K in keyof T]: PropertyDescriptor;
    };

    const obj: ObjectToPropertyDescriptor<{age: number, name: string}> = {
        //age: 57, name: "name" //Помилка value
        age: { value: 57, writable: true, enumerable: true, configurable: true },
        name: { value: "name", writable: true, enumerable: true, configurable: true }
    };
}