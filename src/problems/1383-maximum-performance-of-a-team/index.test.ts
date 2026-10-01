import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumPerformanceOfATeam as maxPerformance } from ".";

/** Tries every team of at most k engineers. */
const byBruteForce = (
	speed: number[],
	efficiency: number[],
	k: number,
): number => {
	let best = 0;
	for (let mask = 1; mask < 2 ** speed.length; mask++) {
		const team = speed.map((_, i) => i).filter((i) => mask & (1 << i));
		if (team.length > k) continue;
		const total = team.reduce((s, i) => s + (speed[i] ?? 0), 0);
		best = Math.max(
			best,
			total * Math.min(...team.map((i) => efficiency[i] ?? 0)),
		);
	}
	return best;
};

describe("1383. Maximum Performance of a Team", () => {
	const [speed, efficiency] = [
		[2, 10, 3, 1, 5, 8],
		[5, 4, 3, 9, 7, 2],
	];

	it("solves the examples from the problem statement", () => {
		expect(maxPerformance(6, speed, efficiency, 2)).toBe(60);
		expect(maxPerformance(6, speed, efficiency, 3)).toBe(68);
		expect(maxPerformance(6, speed, efficiency, 4)).toBe(72);
	});

	it("maximises before reducing modulo 10^9 + 7", () => {
		const n = 100000;
		const fast = new Array<number>(n).fill(100000);
		const efficient = new Array<number>(n).fill(10 ** 8);
		expect(maxPerformance(n, fast, efficient, n)).toBe(
			Number((10n ** 10n * 10n ** 8n) % 1_000_000_007n),
		);
	});

	it("matches trying every team on random inputs", () => {
		const random = createRandom(1383);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const [s, e] = [random.array(n, 1, 20), random.array(n, 1, 20)];
			const k = random.int(1, n);
			expect(maxPerformance(n, s, e, k)).toBe(byBruteForce(s, e, k));
		}
	});
});
