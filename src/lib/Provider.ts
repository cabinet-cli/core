import * as yup from "yup";

import { Plugin } from "./Plugin";
import { Crawler } from "./Crawler";

import { Node, RuleBase } from "./types";

export class Provider<TRule extends RuleBase = RuleBase> {
    private ruleValidationSchema: yup.ObjectSchema<TRule>;

    public constructor(public readonly crawler: Crawler<TRule>, protected readonly plugins: Plugin[] = []) {
        this.ruleValidationSchema = yup
            .object<TRule>()
            .shape<TRule>(({
                type: yup
                    .string()
                    .test(
                        "SameWithCrawlerName",
                        params => `Given rule is referencing crawler '${params.value}' but its for '${crawler.name}'.`,
                        value => value === crawler.name,
                    )
                    .required("Required field 'provider' did not provide on rule definition."),
                ...crawler.getRuleScheme(),
            } as unknown) as yup.ObjectSchemaDefinition<TRule>)
            .required();
    }

    public async doRun(rule: TRule): Promise<Node[]> {
        await this.ruleValidationSchema.validate(rule, {
            abortEarly: true,
            strict: true,
        });

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
