/** The interface LeetCode provides for reading a page's links. */
interface HtmlParser {
	getUrls(url: string): string[];
}

/**
 * 1236. Web Crawler
 *
 * Starting from `startUrl` and following the links `htmlParser.getUrls`
 * reports, returns every URL reached on the same hostname as `startUrl`,
 * in any order.
 *
 * Breadth-first search, crawling each URL once and skipping links to other
 * hosts. URLs are `http://hostname/path`, so the hostname is the third
 * `/`-separated part.
 *
 * @see https://leetcode.com/problems/web-crawler/
 * @difficulty Medium
 * @timeComplexity O(u + l) for u URLs and l links, times the URL length
 * @spaceComplexity O(u)
 *
 * @example
 * webCrawler("http://a.com", { getUrls: (url) => (url === "http://a.com" ? ["http://a.com/x", "http://b.com"] : []) });
 * // ["http://a.com", "http://a.com/x"]
 */
export const webCrawler = (
	startUrl: string,
	htmlParser: HtmlParser,
): string[] => {
	const hostname = (url: string) => url.split("/")[2];
	const host = hostname(startUrl);
	const seen = new Set([startUrl]);
	const queue = [startUrl];
	for (let i = 0; i < queue.length; i++) {
		for (const url of htmlParser.getUrls(queue[i] ?? "")) {
			if (seen.has(url) || hostname(url) !== host) continue;
			seen.add(url);
			queue.push(url);
		}
	}
	return queue;
};
