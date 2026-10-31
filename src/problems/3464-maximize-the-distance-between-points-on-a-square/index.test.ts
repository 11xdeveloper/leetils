import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeTheDistanceBetweenPointsOnASquare as maxDistance } from ".";

/** Tries every choice of k points. */
const byBruteForce = (points: number[][], k: number): number => {
	let best = 0;
	const choose = (from: number, chosen: number[]): void => {
		if (chosen.length === k) {
			let worst = Number.POSITIVE_INFINITY;
			for (let a = 0; a < k; a++)
				for (let b = a + 1; b < k; b++) {
					const [p = [], q = []] = [
						points[chosen[a] ?? 0],
						points[chosen[b] ?? 0],
					];
					worst = Math.min(
						worst,
						Math.abs((p[0] ?? 0) - (q[0] ?? 0)) +
							Math.abs((p[1] ?? 0) - (q[1] ?? 0)),
					);
				}
			best = Math.max(best, worst);
			return;
		}
		for (let i = from; i < points.length; i++) choose(i + 1, [...chosen, i]);
	};
	choose(0, []);
	return best;
};

describe("3464. Maximize the Distance Between Points on a Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxDistance(
				2,
				[
					[0, 2],
					[2, 0],
					[2, 2],
					[0, 0],
				],
				4,
			),
		).toBe(2);
		expect(
			maxDistance(
				2,
				[
					[0, 0],
					[1, 2],
					[2, 0],
					[2, 2],
					[2, 1],
				],
				4,
			),
		).toBe(1);
		expect(
			maxDistance(
				2,
				[
					[0, 0],
					[0, 1],
					[0, 2],
					[1, 2],
					[2, 0],
					[2, 2],
					[2, 1],
				],
				5,
			),
		).toBe(1);
	});

	it("matches trying every choice on random boundary points", () => {
		const random = createRandom(3464);
		for (let run = 0; run < 100; run++) {
			const side = random.int(2, 6);
			const unique = new Map<string, number[]>();
			for (let i = random.int(4, 9); i > 0; i--) {
				const t = random.int(0, 4 * side - 1);
				const p =
					t < side
						? [0, t]
						: t < 2 * side
							? [t - side, side]
							: t < 3 * side
								? [side, 3 * side - t]
								: [4 * side - t, 0];
				unique.set(p.join(), p);
			}
			const points = [...unique.values()];
			if (points.length < 4) continue;
			const k = random.int(4, Math.min(5, points.length));
			expect(maxDistance(side, points, k)).toBe(byBruteForce(points, k));
		}
	});
});
