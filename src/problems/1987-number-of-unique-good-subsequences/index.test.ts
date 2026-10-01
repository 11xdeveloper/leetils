import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfUniqueGoodSubsequences } from ".";

describe("1987. Number of Unique Good Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfUniqueGoodSubsequences("001")).toBe(2);
		expect(numberOfUniqueGoodSubsequences("11")).toBe(2);
		expect(numberOfUniqueGoodSubsequences("101")).toBe(5);
	});

	it("matches collecting every subsequence on random strings", () => {
		const random = createRandom(1987);
		for (let run = 0; run < 200; run++) {
			const binary = random.string(random.int(1, 12), "01");
			const found = new Set<string>();
			for (let mask = 1; mask < 1 << binary.length; mask++) {
				const sub = [...binary].filter((_, i) => mask & (1 << i)).join("");
				if (sub === "0" || sub.startsWith("1")) found.add(sub);
			}
			expect(numberOfUniqueGoodSubsequences(binary)).toBe(found.size);
		}
	});
});
