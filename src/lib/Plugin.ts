import { Node } from "@root/types";

export abstract class Plugin {
    public abstract onAfterCrawl(node: Node): Promise<Node>;
}
