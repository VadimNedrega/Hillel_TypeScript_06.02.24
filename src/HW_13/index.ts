{
    function Memoize<T, A extends any[], R>(
        originalMethod: (...args: A) => R,
        context: ClassMethodDecoratorContext<T, (...args: A) => R>
    ) {
        if (context.kind !== "method") throw new Error("Method-only-decorator");

        const cacheMap = new Map<string, any>();

        function getCacheDataIfContains(this: T, ...args: A): R {
            const cacheKey = `${args.join('_')}`;

            if (cacheMap.has(cacheKey)) {
                console.log("cacheMap has already contained value")
                return cacheMap.get(cacheKey);
            }

            const result = originalMethod.apply(this, args);
            cacheMap.set(cacheKey, result);

            return result;
        }

        return getCacheDataIfContains;
    }

    class Log {
        @Memoize
        showLog(key: string, value: string) {
            return `${key}: ${value}`;
        }
    }

    const str = new Log();
    console.log(str.showLog("key1", "value1"));
    console.log(str.showLog("key2", "value2"));
    console.log(str.showLog("key1", "value1"));
}

{
    function Debounce<T, A extends any[], R>(
        originalMethod: (...args: A) => R,
        context: ClassMethodDecoratorContext<T, (...args: A) => R>
    ) {
        if (context.kind !== "method") throw new Error("Debounce can only be applied to methods");
        let timeout: NodeJS.Timeout;

        function getDelay(this: T, ...args: A): R {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                originalMethod.apply(this, args);
            }, args[0]);

            return undefined as any;
        }

        return getDelay;
    }

    class Example {
        @Debounce
        delay(ms: number) {
            console.log(`Delayed action executed after ${ms} ms`);
        }
    }

    const instance = new Example();
    instance.delay(3000);
}