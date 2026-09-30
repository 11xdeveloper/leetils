import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { campusBikes as assignBikes } from ".";

/** Picks the best remaining pair from scratch each round. */
const bySimulation = (workers: number[][], bikes: number[][]): number[] => {
	const assigned = workers.map(() => -1);
	const taken = new Set<number>();
	for (let round = 0; round < workers.length; round++) {
		let best: number[] | undefined;
		for (const [w, [wx = 0, wy = 0]] of workers.entries()) {
			if (assigned[w] !== -1) continue;
			for (const [b, [bx = 0, by = 0]] of bikes.entries()) {
				if (taken.has(b)) continue;
				const candidate = [Math.abs(wx - bx) + Math.abs(wy - by), w, b];
				const [distance = 0, bestDistance = 0, bestWorker = 0, bestBike = 0] = [
					candidate[0],
					best?.[0],
					best?.[1],
					best?.[2],
				];
				if (
					!best ||
					distance < bestDistance ||
					(distance === bestDistance &&
						(w < bestWorker || (w === bestWorker && b < bestBike)))
				)
					best = candidate;
			}
		}
		const [, w = 0, b = 0] = best ?? [];
		assigned[w] = b;
		taken.add(b);
	}
	return assigned;
};

describe("1057. Campus Bikes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			assignBikes(
				[
					[0, 0],
					[2, 1],
				],
				[
					[1, 2],
					[3, 3],
				],
			),
		).toEqual([1, 0]);
		expect(
			assignBikes(
				[
					[0, 0],
					[1, 1],
					[2, 0],
				],
				[
					[1, 0],
					[2, 2],
					[2, 1],
				],
			),
		).toEqual([0, 2, 1]);
	});

	it("matches picking the best pair each round on random campuses", () => {
		const random = createRandom(1057);
		for (let run = 0; run < 300; run++) {
			const points = new Map<string, number[]>();
			while (points.size < 12) {
				const point = [random.int(0, 6), random.int(0, 6)];
				points.set(point.join(), point);
			}
			const all = [...points.values()];
			const n = random.int(1, 5);
			const m = random.int(n, 7);
			expect(assignBikes(all.slice(0, n), all.slice(n, n + m))).toEqual(
				bySimulation(all.slice(0, n), all.slice(n, n + m)),
			);
		}
	});
});
