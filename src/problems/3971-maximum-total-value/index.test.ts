import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTotalValue as maxTotalValue } from ".";

/** Greedily takes the best next gain m times. */
const byBruteForce = (value: number[], decay: number[], m: number): number => {
	const times = value.map(() => 0);
	let total = 0;
	for (let s = 0; s < m; s++) {
		let [best, at] = [0, -1];
		value.forEach((v, i) => {
			const gain = v - (decay[i] ?? 0) * (times[i] ?? 0);
			if (gain > best) [best, at] = [gain, i];
		});
		if (at < 0) break;
		total += best;
		times[at] = (times[at] ?? 0) + 1;
	}
	return total % 1_000_000_007;
};

describe("3971. Maximum Total Value", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTotalValue([6, 5, 4], [2, 1, 1], 4)).toBe(19);
		expect(maxTotalValue([7, 2, 2], [3, 2, 1], 2)).toBe(11);
		expect(maxTotalValue([4, 3], [5, 4], 5)).toBe(7);
	});

	it("matches taking the best gain each time on random input", () => {
		const random = createRandom(3971);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 5);
			const value = random.array(n, 1, 20);
			const decay = random.array(n, 1, 5);
			const m = random.int(1, 30);
			expect(maxTotalValue(value, decay, m)).toBe(
				byBruteForce(value, decay, m),
			);
		}
	});

	it("reduces huge totals modulo 1e9+7", () => {
		const expected = Number(
			((10n ** 9n * (10n ** 9n + 1n)) / 2n) % 1_000_000_007n,
		);
		expect(maxTotalValue([1e9], [1], 1e9)).toBe(expected);
	});
});
