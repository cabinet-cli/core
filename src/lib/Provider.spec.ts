import { Provider } from "./Provider";
import { Crawler } from "./Crawler";
import { Plugin } from "./Plugin";
import { Node } from "./types";

describe("Provider", () => {
    it("executes registered plugins", async () => {
        class ExamplePlugin extends Plugin {
            public static calledCount = 0;
            public static beforeCalledCount = 0;

            public async onAfterCrawl(node: Node): Promise<Node> {
                ExamplePlugin.calledCount++;
                return node;
            }

            public async onBeforeCrawl(): Promise<Partial<Node>> {
                ExamplePlugin.beforeCalledCount++;
                return {};
            }
        }

        class ExampleCrawler extends Crawler {
            constructor() {
                super("example");
            }

            public async run(): Promise<Node[]> {
                return [{ title: "", content: "" }];
            }
        }

        const provider = new Provider(new ExampleCrawler(), [new ExamplePlugin(), new ExamplePlugin()]);
        await provider.doRun({});

        expect(ExamplePlugin.calledCount).toEqual(2);
        expect(ExamplePlugin.beforeCalledCount).toEqual(2);
    });
});
