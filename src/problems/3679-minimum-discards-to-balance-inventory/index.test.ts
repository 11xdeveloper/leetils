import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumDiscardsToBalanceInventory as minArrivalsToDiscard } from ".";

/** Tries every set of kept items. */
const byBruteForce = (arrivals: number[], w: number, m: number): number => {
	const n = arrivals.length;
	let best = n;
	for (let mask = 0; mask < 1 << n; mask++) {
		let ok = true;
		for (let end = 0; end < n && ok; end++) {
			const counts = new Map<number, number>();
			for (let i = Math.max(0, end - w + 1); i <= end; i++)
				if ((mask >> i) & 1)
					counts.set(arrivals[i] ?? 0, (counts.get(arrivals[i] ?? 0) ?? 0) + 1);
			if ([...counts.values()].some((c) => c > m)) ok = false;
		}
		let bits = 0;
		for (let x = mask; x; x &= x - 1) bits++;
		if (ok) best = Math.min(best, n - bits);
	}
	return best;
};

describe("3679. Minimum Discards to Balance Inventory", () => {
	it("solves the examples from the problem statement", () => {
		expect(minArrivalsToDiscard([1, 2, 1, 3, 1], 4, 2)).toBe(0);
		expect(minArrivalsToDiscard([1, 2, 3, 3, 3, 4], 3, 2)).toBe(1);
	});

	it("matches trying every choice on random arrivals", () => {
		const random = createRandom(3679);
		for (let run = 0; run < 150; run++) {
			const arrivals = random.array(random.int(1, 9), 1, 3);
			const w = random.int(1, arrivals.length);
			const m = random.int(1, w);
			expect(minArrivalsToDiscard(arrivals, w, m)).toBe(
				byBruteForce(arrivals, w, m),
			);
		}
	});
});
