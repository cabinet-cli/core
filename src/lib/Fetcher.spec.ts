import fetchMock from "jest-fetch-mock";

import { Fetcher } from "@root/Fetcher";

const FETCH_MOCK_DATA = '{ "data": "test" }';

describe("Fetcher", () => {
    beforeEach(() => {
        fetchMock.mockIf(/^https?:\/\/example.com.*$/, async req => {
            if (req.url.endsWith("/test")) {
                return FETCH_MOCK_DATA;
            } else {
                return {
                    status: 404,
                    body: "Not Found",
                };
            }
        });
    });

    it("fetches url in valid object type", async () => {
        const fetcher = new Fetcher();
        const data = await fetcher.fetchJSON<{ data: string }>("http://example.com/test");

        expect(data).toEqual(JSON.parse(FETCH_MOCK_DATA));
    });

    it("fetches url in valid string type", async () => {
        const fetcher = new Fetcher();
        const data = await fetcher.fetchText("http://example.com/test");

        expect(data).toEqual(FETCH_MOCK_DATA);
    });

    it("throws an error when related error provided", async () => {
        const fetcher = new Fetcher();

        await expect(
            (async () => {
                await fetcher.fetch("http://example.com/invalid", {
                    throwOnError: true,
                });
            })(),
        ).rejects.toThrow();
    });

    it("returns null when `throwOnError` option not set", async () => {
        const fetcher = new Fetcher();
        const response = await fetcher.fetch("http://example.com/invalid");
        const text = await fetcher.fetchText("http://example.com/invalid");
        const json = await fetcher.fetchJSON("http://example.com/invalid");

        expect(response).toBeNull();
        expect(text).toBeNull();
        expect(json).toBeNull();
    });
});
