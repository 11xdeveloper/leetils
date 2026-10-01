import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { repeatedStringMatch } from ".";

const byBruteForce = (a: string, b: string): number => {
	for (let copies = 1; copies * a.length <= b.length + 2 * a.length; copies++)
		if (a.repeat(copies).includes(b)) return copies;
	return -1;
};

describe("686. Repeated String Match", () => {
	it("solves the examples from the problem statement", () => {
		expect(repeatedStringMatch("abcd", "cdabcdab")).toBe(3);
		expect(repeatedStringMatch("a", "aa")).toBe(2);
	});

	it("matches adding copies one at a time on random inputs", () => {
		const random = createRandom(686);
		for (let run = 0; run < 1000; run++) {
			const a = random.string(random.int(1, 4), "ab");
			const b = random.string(random.int(1, 10), "ab");
			expect(repeatedStringMatch(a, b)).toBe(byBruteForce(a, b));
		}
	});
});
