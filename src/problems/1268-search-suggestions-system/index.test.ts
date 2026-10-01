import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { searchSuggestionsSystem as suggestedProducts } from ".";

describe("1268. Search Suggestions System", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			suggestedProducts(
				["mobile", "mouse", "moneypot", "monitor", "mousepad"],
				"mouse",
			),
		).toEqual([
			["mobile", "moneypot", "monitor"],
			["mobile", "moneypot", "monitor"],
			["mouse", "mousepad"],
			["mouse", "mousepad"],
			["mouse", "mousepad"],
		]);
		expect(suggestedProducts(["havana"], "havana")).toEqual(
			new Array(6).fill(["havana"]),
		);
	});

	it("matches filtering every product on random inputs", () => {
		const random = createRandom(1268);
		for (let run = 0; run < 300; run++) {
			const products = [
				...new Set(
					Array.from({ length: random.int(1, 10) }, () =>
						random.string(random.int(1, 4), "abc"),
					),
				),
			];
			const searchWord = random.string(random.int(1, 4), "abc");
			expect(suggestedProducts(products, searchWord)).toEqual(
				[...searchWord].map((_, i) =>
					products
						.filter((product) => product.startsWith(searchWord.slice(0, i + 1)))
						.sort()
						.slice(0, 3),
				),
			);
		}
	});
});
