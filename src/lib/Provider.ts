import { Plugin } from "@root/Plugin";
import { Crawler } from "@root/Crawler";

import { Node, RuleBase } from "@root/types";

export class Provider<TRule extends RuleBase = RuleBase> {
    public constructor(public readonly crawler: Crawler<TRule>, protected readonly plugins: Plugin[] = []) {}

    public async doRun(rule: TRule): Promise<Node[]> {
        const crawledNode = await this.crawler.run(rule);
        for (let i = 0; i < crawledNode.length; i++) {
            for (const plugin of this.plugins) {
                const baseNode: Partial<Node> = {
                    ...(await plugin.onBeforeCrawl(crawledNode[i])),
                };

                crawledNode[i] = {
                    ...baseNode,
                    ...(await plugin.onAfterCrawl(crawledNode[i])),
                };
            }
        }

        return crawledNode;
    }
}
