import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfBeautifulPartitions as beautifulPartitions } from ".";

/** Tries every set of cut points. */
const byBruteForce = (s: string, k: number, minLength: number): number => {
	const prime = (c: string | undefined): boolean => "2357".includes(c ?? "x");
	let count = 0;
	for (let mask = 0; mask < 1 << (s.length - 1); mask++) {
		const cuts = [0];
		for (let i = 1; i < s.length; i++) if (mask & (1 << (i - 1))) cuts.push(i);
		cuts.push(s.length);
		if (cuts.length - 1 !== k) continue;
		let valid = true;
		for (let p = 0; p + 1 < cuts.length; p++) {
			const [a = 0, b = 0] = [cuts[p], cuts[p + 1]];
			if (b - a < minLength || !prime(s[a]) || prime(s[b - 1])) valid = false;
		}
		if (valid) count++;
	}
	return count;
};

describe("2478. Number of Beautiful Partitions", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautifulPartitions("23542185131", 3, 2)).toBe(3);
		expect(beautifulPartitions("23542185131", 3, 3)).toBe(1);
		expect(beautifulPartitions("3312958", 3, 1)).toBe(1);
	});

	it("matches trying every split on random strings", () => {
		const random = createRandom(2478);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 12), "123456789");
			const k = random.int(1, 4);
			const minLength = random.int(1, 3);
			expect(beautifulPartitions(s, k, minLength)).toBe(
				byBruteForce(s, k, minLength),
			);
		}
	});
});
