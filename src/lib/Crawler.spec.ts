import { Crawler } from "@root/Crawler";

describe("Crawler", () => {
    it("initializes with name properly", () => {
        class ExampleCrawler extends Crawler {
            constructor() {
                super("example");
            }

            run() {
                return Promise.resolve([]);
            }
        }

        const provider = new ExampleCrawler();
        expect(provider.name).toEqual("example");
    });

    it("throws an error when invalid name provided", () => {
        class ExampleCrawler extends Crawler {
            constructor() {
                super("");
            }

            run() {
                return Promise.resolve([]);
            }
        }

        expect(() => {
            new ExampleCrawler();
        }).toThrow("Given provider name '' is not valid");
    });
});
