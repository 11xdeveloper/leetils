import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumPartitionFactor as maxPartitionFactor } from ".";

/** Tries every split. */
const byBruteForce = (points: number[][]): number => {
	const n = points.length;
	if (n <= 2) return 0;
	let best = 0;
	for (let mask = 1; mask < (1 << n) - 1; mask++) {
		let factor = Number.POSITIVE_INFINITY;
		for (let i = 0; i < n; i++)
			for (let j = i + 1; j < n; j++)
				if (((mask >> i) & 1) === ((mask >> j) & 1)) {
					const [a = [], b = []] = [points[i], points[j]];
					factor = Math.min(
						factor,
						Math.abs((a[0] ?? 0) - (b[0] ?? 0)) +
							Math.abs((a[1] ?? 0) - (b[1] ?? 0)),
					);
				}
		if (factor !== Number.POSITIVE_INFINITY) best = Math.max(best, factor);
	}
	return best;
};

describe("3710. Maximum Partition Factor", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPartitionFactor([
				[0, 0],
				[0, 2],
				[2, 0],
				[2, 2],
			]),
		).toBe(4);
		expect(
			maxPartitionFactor([
				[0, 0],
				[0, 1],
				[10, 0],
			]),
		).toBe(11);
	});

	it("matches trying every split on random points", () => {
		const random = createRandom(3710);
		for (let run = 0; run < 150; run++) {
			const points = Array.from({ length: random.int(2, 8) }, () => [
				random.int(0, 9),
				random.int(0, 9),
			]);
			expect(maxPartitionFactor(points)).toBe(byBruteForce(points));
		}
	});
});
