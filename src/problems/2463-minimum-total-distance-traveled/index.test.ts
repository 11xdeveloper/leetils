import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTotalDistanceTraveled as minimumTotalDistance } from ".";

/** Tries every assignment of robots to factories. */
const byBruteForce = (robots: number[], factories: number[][]): number => {
	const left = factories.map(([, limit = 0]) => limit);
	let best = Infinity;
	const assign = (i: number, total: number): void => {
		if (total >= best) return;
		if (i === robots.length) {
			best = total;
			return;
		}
		for (const [f, [position = 0]] of factories.entries()) {
			if (!left[f]) continue;
			left[f] = (left[f] ?? 0) - 1;
			assign(i + 1, total + Math.abs((robots[i] ?? 0) - position));
			left[f] = (left[f] ?? 0) + 1;
		}
	};
	assign(0, 0);
	return best;
};

describe("2463. Minimum Total Distance Traveled", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumTotalDistance(
				[0, 4, 6],
				[
					[2, 2],
					[6, 2],
				],
			),
		).toBe(4);
		expect(
			minimumTotalDistance(
				[1, -1],
				[
					[-2, 1],
					[2, 1],
				],
			),
		).toBe(2);
	});

	it("matches trying every assignment on random inputs", () => {
		const random = createRandom(2463);
		for (let run = 0; run < 150; run++) {
			const robots = [...new Set(random.array(random.int(1, 5), -10, 10))];
			const positions = [...new Set(random.array(random.int(1, 3), -10, 10))];
			const factories = positions.map((p) => [p, random.int(1, 3)]);
			const capacity = factories.reduce((s, [, l = 0]) => s + l, 0);
			if (capacity < robots.length) continue;
			expect(minimumTotalDistance(robots, factories)).toBe(
				byBruteForce(robots, factories),
			);
		}
	});
});
