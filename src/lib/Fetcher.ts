import fetch, { RequestInit, Response } from "node-fetch";

import pkg from "../../package.json";

interface FetchOption extends RequestInit {
    throwOnError?: boolean;
}

export class Fetcher {
    private fetchOptions: RequestInit = {
        headers: {
            "User-Agent": `@cabinet-cli/core ${pkg.version}`,
        },
    };

    public async fetch(url: string, options?: FetchOption): Promise<Response | null> {
        try {
            const response = await fetch(url, {
                ...options,
                ...this.fetchOptions,
                headers: {
                    ...(options?.headers || {}),
                    ...(this.fetchOptions.headers || {}),
                },
            });

            if (!response.ok) {
                throw new Error(`The server provided unsuccessful response: ${response.status}`);
            }

            return response;
        } catch (e) {
            if (options?.throwOnError) {
                throw e;
            }

            return null;
        }
    }

    public async fetchJSON<T>(url: string, options?: FetchOption): Promise<T | null> {
        const response = await this.fetch(url, options);
        if (!response) {
            return null;
        }

        return response.json();
    }

    public async fetchText(url: string, options?: FetchOption): Promise<string | null> {
        const response = await this.fetch(url, options);
        if (!response) {
            return null;
        }

        return response.text();
    }
}
