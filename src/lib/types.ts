import { Crawler } from "@root/Crawler";

export interface RuleBase {
    provider: Crawler;
}

export interface Node {
    title?: string;
    content: string;
}
