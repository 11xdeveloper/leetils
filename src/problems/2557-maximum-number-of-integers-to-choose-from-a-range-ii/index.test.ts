import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfIntegersToChooseFromARangeII as maxCount } from ".";

/** Takes allowed integers one at a time. */
const byBruteForce = (banned: number[], n: number, maxSum: number): number => {
	let chosen = 0;
	for (let x = 1; x <= n && x <= maxSum; x++)
		if (!banned.includes(x)) {
			maxSum -= x;
			chosen++;
		}
	return chosen;
};

describe("2557. Maximum Number of Integers to Choose From a Range II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxCount([1, 4, 6], 6, 4)).toBe(1);
		expect(maxCount([4, 3, 5, 6], 7, 18)).toBe(3);
	});

	it("matches taking integers one at a time on random inputs", () => {
		const random = createRandom(2557);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 30);
			const banned = random.array(random.int(0, 8), 1, 35);
			const maxSum = random.int(1, 200);
			expect(maxCount(banned, n, maxSum)).toBe(byBruteForce(banned, n, maxSum));
		}
	});

	it("handles huge ranges", () => {
		expect(maxCount([], 1_000_000_000, 1_000_000_000_000_000)).toBe(44_721_359);
	});
});
