import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeMeetingEarningsWithIdleGaps as maxEarnings } from ".";

/** Tries every subset. */
const byBruteForce = (meetings: number[][]): number => {
	let best = Number.NEGATIVE_INFINITY;
	for (let mask = 1; mask < 1 << meetings.length; mask++) {
		const picked = meetings
			.filter((_, i) => (mask >> i) & 1)
			.sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
		if (picked.some((m, i) => i > 0 && (m[0] ?? 0) < (picked[i - 1]?.[1] ?? 0)))
			continue;
		let total = picked.reduce((s, m) => s + (m[2] ?? 0), 0);
		for (let i = 1; i < picked.length; i++)
			total += (picked[i]?.[0] ?? 0) - (picked[i - 1]?.[1] ?? 0);
		best = Math.max(best, total);
	}
	return best;
};

describe("4068. Maximize Meeting Earnings with Idle Gaps", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxEarnings([
				[2, 5, 4],
				[6, 8, 3],
			]),
		).toBe(8);
		expect(
			maxEarnings([
				[3, 5, 4],
				[4, 7, 8],
				[8, 10, 3],
			]),
		).toBe(12);
		expect(
			maxEarnings([
				[1, 2, 2],
				[4, 5, 2],
				[7, 9, 3],
			]),
		).toBe(11);
	});

	it("matches trying every subset on random meetings", () => {
		const random = createRandom(4068);
		for (let run = 0; run < 200; run++) {
			const meetings = Array.from({ length: random.int(1, 7) }, () => {
				const s = random.int(0, 15);
				return [s, s + random.int(1, 5), random.int(1, 8)];
			});
			expect(maxEarnings(meetings)).toBe(byBruteForce(meetings));
		}
	});
});
