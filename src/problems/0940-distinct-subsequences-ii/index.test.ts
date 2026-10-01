import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { distinctSubsequencesII } from ".";

describe("940. Distinct Subsequences II", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctSubsequencesII("abc")).toBe(7);
		expect(distinctSubsequencesII("aba")).toBe(6);
		expect(distinctSubsequencesII("aaa")).toBe(3);
	});

	it("matches collecting every subsequence on random strings", () => {
		const random = createRandom(940);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 12), "abc");
			const found = new Set<string>();
			for (let mask = 1; mask < 1 << s.length; mask++)
				found.add([...s].filter((_, i) => mask & (1 << i)).join(""));
			expect(distinctSubsequencesII(s)).toBe(found.size);
		}
	});
});
