import { Provider } from "@root/Provider";

describe("Provider", () => {
    it("initializes with name properly", () => {
        class ExampleProvider extends Provider {
            constructor() {
                super("example");
            }

            run() {
                return Promise.resolve([]);
            }
        }

        const provider = new ExampleProvider();
        expect(provider.name).toEqual("example");
    });

    it("throws an error when invalid name provided", () => {
        class ExampleProvider extends Provider {
            constructor() {
                super("");
            }

            run() {
                return Promise.resolve([]);
            }
        }

        expect(() => {
            new ExampleProvider();
        }).toThrow("Given provider name '' is not valid");
    });
});
