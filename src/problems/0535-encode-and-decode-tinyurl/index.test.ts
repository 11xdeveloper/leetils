import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { EncodeAndDecodeTinyurl } from ".";

describe("535. Encode and Decode TinyURL", () => {
	it("solves the example from the problem statement", () => {
		const codec = new EncodeAndDecodeTinyurl();
		const url = "https://leetcode.com/problems/design-tinyurl";
		expect(codec.decode(codec.encode(url))).toBe(url);
	});

	it("gives short, distinct URLs that decode back, reusing them for repeated URLs", () => {
		const codec = new EncodeAndDecodeTinyurl();
		const random = createRandom(535);
		const urls = Array.from(
			{ length: 5000 },
			(_, i) => `https://example.com/${i}/${random.string(20, "abc/?=&")}`,
		);
		const short = urls.map((url) => codec.encode(url));
		expect(new Set(short).size).toBe(urls.length);
		for (const [i, url] of urls.entries()) {
			expect(codec.decode(short[i] ?? "")).toBe(url);
			expect(codec.encode(url)).toBe(short[i] ?? "");
			expect((short[i] ?? "").length).toBeLessThan(25);
		}
	});
});
