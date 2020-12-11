export interface RuleBase {
    provider: Provider;
}

export interface NodeBase {
    title?: string;
    content: string;
}

export abstract class Provider<TRule extends RuleBase = RuleBase, TNode extends NodeBase = NodeBase> {
    protected constructor(public readonly name: string) {
        if (!this.name) {
            throw new Error(`Given provider name '${this.name}' is not valid`);
        }
    }

    public abstract run(rule: TRule): Promise<TNode[]>;
}
