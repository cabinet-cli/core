import { ObjectSchemaDefinition, number } from "yup";

import { Crawler } from "./Crawler";
import { RuleBase, Node } from "./types";
import { Provider } from "./Provider";

interface ExampleRule extends RuleBase {
    example: number;
}

describe("Crawler", () => {
    it("initializes with name properly", () => {
        class ExampleCrawler extends Crawler {
            constructor() {
                super("example");
            }

            getRuleScheme(): ObjectSchemaDefinition<Omit<RuleBase, "type">> {
                return {};
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

            getRuleScheme(): ObjectSchemaDefinition<Omit<RuleBase, "type">> {
                return {};
            }

            run() {
                return Promise.resolve([]);
            }
        }

        expect(() => {
            new ExampleCrawler();
        }).toThrow("Given crawler name '' is not valid");
    });

    it("applies custom rule validation schema", async () => {
        class CustomRuleCrawler extends Crawler<ExampleRule> {
            constructor() {
                super("custom-rule");
            }

            public getRuleScheme(): ObjectSchemaDefinition<Omit<ExampleRule, "type">> {
                return {
                    example: number().required(),
                };
            }

            public async run(): Promise<Node[]> {
                return [];
            }
        }

        await expect(
            new Provider<ExampleRule>(new CustomRuleCrawler()).doRun({
                type: "custom-rule",
                example: ("123" as any) as number,
            }),
        ).rejects.toThrow();
    });
});
