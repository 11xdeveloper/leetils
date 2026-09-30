import { describe, expect, it } from "bun:test";
import { webCrawler as crawl } from ".";

const parser = (urls: string[], edges: number[][]) => {
	const calls: string[] = [];
	return {
		calls,
		getUrls: (url: string) => {
			calls.push(url);
			const from = urls.indexOf(url);
			return edges
				.filter(([a]) => a === from)
				.map(([, b]) => urls[b ?? 0] ?? "");
		},
	};
};

describe("1236. Web Crawler", () => {
	it("solves the examples from the problem statement", () => {
		const urls = [
			"http://news.yahoo.com",
			"http://news.yahoo.com/news",
			"http://news.yahoo.com/news/topics/",
			"http://news.google.com",
			"http://news.yahoo.com/us",
		];
		expect(
			crawl(
				"http://news.yahoo.com/news/topics/",
				parser(urls, [
					[2, 0],
					[2, 1],
					[3, 2],
					[3, 1],
					[0, 4],
				]),
			).sort(),
		).toEqual([
			"http://news.yahoo.com",
			"http://news.yahoo.com/news",
			"http://news.yahoo.com/news/topics/",
			"http://news.yahoo.com/us",
		]);
		expect(
			crawl(
				"http://news.google.com",
				parser(urls.slice(0, 4), [
					[0, 2],
					[2, 1],
					[3, 2],
					[3, 1],
					[3, 0],
				]),
			),
		).toEqual(["http://news.google.com"]);
	});

	it("crawls each page once, even with cycles", () => {
		const urls = ["http://a.com", "http://a.com/b", "http://a.com/c"];
		const html = parser(urls, [
			[0, 1],
			[1, 2],
			[2, 0],
			[2, 1],
		]);
		expect(crawl("http://a.com", html).sort()).toEqual(urls);
		expect(html.calls.sort()).toEqual(urls);
	});

	it("treats a subdomain as a different host", () => {
		const urls = ["http://a.com", "http://www.a.com", "http://a.com.au"];
		expect(
			crawl(
				"http://a.com",
				parser(urls, [
					[0, 1],
					[0, 2],
				]),
			),
		).toEqual(["http://a.com"]);
	});
});
