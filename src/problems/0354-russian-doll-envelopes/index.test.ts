import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { russianDollEnvelopes } from ".";

/** Longest chain in the "fits inside" order, by dynamic programming over sorted envelopes. */
const byDynamicProgramming = (envelopes: number[][]): number => {
	const sorted = envelopes.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const chain = sorted.map(() => 1);
	for (let i = 0; i < sorted.length; i++) {
		for (let j = 0; j < i; j++) {
			const [wi = 0, hi = 0] = sorted[i] ?? [];
			const [wj = 0, hj = 0] = sorted[j] ?? [];
			if (wj < wi && hj < hi)
				chain[i] = Math.max(chain[i] ?? 1, (chain[j] ?? 1) + 1);
		}
	}
	return Math.max(0, ...chain);
};

describe("354. Russian Doll Envelopes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			russianDollEnvelopes([
				[5, 4],
				[6, 4],
				[6, 7],
				[2, 3],
			]),
		).toBe(3);
		expect(
			russianDollEnvelopes([
				[1, 1],
				[1, 1],
				[1, 1],
			]),
		).toBe(1);
	});

	it("doesn't nest envelopes of the same width", () => {
		expect(
			russianDollEnvelopes([
				[4, 5],
				[4, 6],
				[6, 7],
				[2, 3],
				[1, 1],
			]),
		).toBe(4);
	});

	it("matches quadratic dynamic programming on random inputs", () => {
		const random = createRandom(354);
		for (let run = 0; run < 1000; run++) {
			const envelopes = Array.from({ length: random.int(1, 12) }, () => [
				random.int(1, 8),
				random.int(1, 8),
			]);
			expect(russianDollEnvelopes(envelopes)).toBe(
				byDynamicProgramming(envelopes),
			);
		}
	});
});
