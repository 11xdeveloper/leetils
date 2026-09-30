import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { frogPositionAfterTSeconds as frogPosition } from ".";

/** Tracks the full probability distribution second by second. */
const byBruteForce = (
	n: number,
	edges: number[][],
	t: number,
	target: number,
): number => {
	const neighbours = Array.from({ length: n + 1 }, (): number[] => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	// States are [vertex, visited set as a key, probability].
	let states: [number, Set<number>, number][] = [[1, new Set([1]), 1]];
	for (let second = 0; second < t; second++) {
		const next: [number, Set<number>, number][] = [];
		for (const [vertex, visited, chance] of states) {
			const options = (neighbours[vertex] ?? []).filter((v) => !visited.has(v));
			if (options.length === 0) next.push([vertex, visited, chance]);
			for (const option of options) {
				next.push([
					option,
					new Set([...visited, option]),
					chance / options.length,
				]);
			}
		}
		states = next;
	}
	return states
		.filter(([vertex]) => vertex === target)
		.reduce((sum, [, , chance]) => sum + chance, 0);
};

describe("1377. Frog Position After T Seconds", () => {
	const edges = [
		[1, 2],
		[1, 3],
		[1, 7],
		[2, 4],
		[2, 6],
		[3, 5],
	];

	it("solves the examples from the problem statement", () => {
		expect(frogPosition(7, edges, 2, 4)).toBeCloseTo(1 / 6);
		expect(frogPosition(7, edges, 1, 7)).toBeCloseTo(1 / 3);
	});

	it("leaves the frog behind when it has somewhere left to go", () => {
		expect(frogPosition(7, edges, 2, 2)).toBe(0);
		expect(frogPosition(7, edges, 20, 7)).toBeCloseTo(1 / 3);
		expect(frogPosition(1, [], 5, 1)).toBe(1);
	});

	it("matches tracking every jump on random trees", () => {
		const random = createRandom(1377);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 9);
			const tree = Array.from({ length: n - 1 }, (_, i) => [
				random.int(1, i + 1),
				i + 2,
			]);
			const [t, target] = [random.int(1, 6), random.int(1, n)];
			expect(frogPosition(n, tree, t, target)).toBeCloseTo(
				byBruteForce(n, tree, t, target),
				9,
			);
		}
	});
});
