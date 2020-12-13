import { Fetcher } from "@root/Fetcher";

import { Node, RuleBase } from "@root/types";

export abstract class Crawler<TRule extends RuleBase = RuleBase> {
    protected readonly fetcher: Fetcher = new Fetcher();

    protected constructor(public readonly name: string) {
        if (!this.name) {
            throw new Error(`Given crawler name '${this.name}' is not valid`);
        }
    }

    public abstract run(rule: TRule): Promise<Node[]>;
}
