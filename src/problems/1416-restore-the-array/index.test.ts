import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { restoreTheArray as numberOfArrays } from ".";

/** Tries every set of cut positions. */
const byBruteForce = (s: string, k: number): number => {
	let count = 0;
	for (let cuts = 0; cuts < 2 ** (s.length - 1); cuts++) {
		const parts: string[] = [];
		let start = 0;
		for (let i = 1; i <= s.length; i++) {
			if (i === s.length || cuts & (1 << (i - 1))) {
				parts.push(s.slice(start, i));
				start = i;
			}
		}
		if (
			parts.every(
				(part) =>
					!part.startsWith("0") && Number(part) >= 1 && Number(part) <= k,
			)
		)
			count++;
	}
	return count;
};

describe("1416. Restore The Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfArrays("1000", 10000)).toBe(1);
		expect(numberOfArrays("1000", 10)).toBe(0);
		expect(numberOfArrays("1317", 2000)).toBe(8);
	});

	it("handles long strings with a large k", () => {
		const count = numberOfArrays("1".repeat(100000), 10 ** 9);
		expect(count).toBeGreaterThanOrEqual(0);
		expect(count).toBeLessThan(1_000_000_007);
	});

	it("matches trying every split on random inputs", () => {
		const random = createRandom(1416);
		for (let run = 0; run < 300; run++) {
			const s =
				String(random.int(1, 9)) + random.string(random.int(0, 9), "0123");
			const k = random.int(1, 5000);
			expect(numberOfArrays(s, k)).toBe(byBruteForce(s, k));
		}
	});
});
