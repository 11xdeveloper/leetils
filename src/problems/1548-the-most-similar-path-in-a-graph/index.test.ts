import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { theMostSimilarPathInAGraph as mostSimilar } from ".";

const mismatches = (path: number[], names: string[], target: string[]) =>
	path.filter((city, i) => names[city] !== target[i]).length;

/** The fewest mismatches over every walk, by trying them all. */
const fewest = (
	n: number,
	roads: number[][],
	names: string[],
	target: string[],
): number => {
	const adjacent = (a: number, b: number) =>
		roads.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
	let best = Infinity;
	const walk = (path: number[]): void => {
		if (path.length === target.length) {
			best = Math.min(best, mismatches(path, names, target));
			return;
		}
		for (let city = 0; city < n; city++) {
			if (path.length === 0 || adjacent(path.at(-1) ?? 0, city))
				walk([...path, city]);
		}
	};
	walk([]);
	return best;
};

const expectBest = (
	n: number,
	roads: number[][],
	names: string[],
	target: string[],
) => {
	const path = mostSimilar(n, roads, names, target);
	expect(path).toHaveLength(target.length);
	for (let i = 1; i < path.length; i++) {
		const [a, b] = [path[i - 1], path[i]];
		expect(
			roads.some(([x, y]) => (x === a && y === b) || (x === b && y === a)),
		).toBeTrue();
	}
	expect(mismatches(path, names, target)).toBe(fewest(n, roads, names, target));
};

describe("1548. The Most Similar Path in a Graph", () => {
	it("solves the examples from the problem statement", () => {
		expectBest(
			5,
			[
				[0, 2],
				[0, 3],
				[1, 2],
				[1, 3],
				[1, 4],
				[2, 4],
			],
			["ATL", "PEK", "LAX", "DXB", "HND"],
			["ATL", "DXB", "HND", "LAX"],
		);
		expectBest(
			4,
			[
				[1, 0],
				[2, 0],
				[3, 0],
				[2, 1],
				[3, 1],
				[3, 2],
			],
			["ATL", "PEK", "LAX", "DXB"],
			["ABC", "DEF", "GHI", "JKL"],
		);
		expect(
			mostSimilar(
				6,
				[
					[0, 1],
					[1, 2],
					[2, 3],
					[3, 4],
					[4, 5],
				],
				["ATL", "PEK", "LAX", "ATL", "DXB", "HND"],
				["ATL", "DXB", "HND", "DXB", "ATL", "LAX", "PEK"],
			),
		).toEqual([3, 4, 5, 4, 3, 2, 1]);
	});

	it("finds a most similar walk on random graphs", () => {
		const random = createRandom(1548);
		const pool = ["AAA", "BBB", "CCC"];
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 5);
			const roads: number[][] = [];
			for (let v = 1; v < n; v++) roads.push([random.int(0, v - 1), v]);
			const names = Array.from(
				{ length: n },
				() => pool[random.int(0, 2)] ?? "AAA",
			);
			const target = Array.from(
				{ length: random.int(1, 4) },
				() => pool[random.int(0, 2)] ?? "AAA",
			);
			expectBest(n, roads, names, target);
		}
	});
});
