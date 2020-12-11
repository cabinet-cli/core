import Provider from "@root/Provider";

describe("Provider", () => {
    it("initializes with name properly", () => {
        class ExampleProvider extends Provider {
            constructor() {
                super("example");
            }
        }

        const provider = new ExampleProvider();
        expect(provider.name).toEqual("example");
    })
})
