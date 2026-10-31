import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeKBalancedSubstrings as removeSubstring } from ".";

/** Removes the pattern until it no longer appears. */
const byBruteForce = (s: string, k: number): string => {
	const pattern = "(".repeat(k) + ")".repeat(k);
	for (let t = s; ; ) {
		const next = t.replace(pattern, "");
		if (next === t) return t;
		t = next;
	}
};

describe("3703. Remove K-Balanced Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeSubstring("(())", 1)).toBe("");
		expect(removeSubstring("(()(", 1)).toBe("((");
		expect(removeSubstring("((()))()()()", 3)).toBe("()()()");
	});

	it("matches repeated removal on random strings", () => {
		const random = createRandom(3703);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 16), "()");
			const k = random.int(1, 3);
			expect(removeSubstring(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
