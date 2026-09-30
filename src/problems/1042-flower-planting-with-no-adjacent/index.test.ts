import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { flowerPlantingWithNoAdjacent as gardenNoAdj } from ".";

describe("1042. Flower Planting With No Adjacent", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			gardenNoAdj(3, [
				[1, 2],
				[2, 3],
				[3, 1],
			]),
		).toEqual([1, 2, 3]);
		expect(
			gardenNoAdj(4, [
				[1, 2],
				[3, 4],
			]),
		).toEqual([1, 2, 1, 2]);
	});

	it("gives valid plantings on random graphs of degree at most 3", () => {
		const random = createRandom(1042);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 20);
			const degree = new Array<number>(n + 1).fill(0);
			const paths: number[][] = [];
			for (let tries = 0; tries < 40; tries++) {
				const [a, b] = [random.int(1, n), random.int(1, n)];
				if (
					a === b ||
					(degree[a] ?? 0) >= 3 ||
					(degree[b] ?? 0) >= 3 ||
					paths.some(([x, y]) => (x === a && y === b) || (x === b && y === a))
				)
					continue;
				paths.push([a, b]);
				degree[a] = (degree[a] ?? 0) + 1;
				degree[b] = (degree[b] ?? 0) + 1;
			}
			const types = gardenNoAdj(n, paths);
			expect(types).toHaveLength(n);
			for (const type of types) expect(type).toBeWithin(1, 5);
			for (const [a = 1, b = 1] of paths)
				expect(types[a - 1]).not.toBe(types[b - 1]);
		}
	});
});
