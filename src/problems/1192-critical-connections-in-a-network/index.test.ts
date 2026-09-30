import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { criticalConnectionsInANetwork as criticalConnections } from ".";

const connected = (n: number, edges: number[][]): boolean => {
	const seen = new Set([0]);
	for (let grew = true; grew; ) {
		grew = false;
		for (const [a = 0, b = 0] of edges) {
			if (seen.has(a) === seen.has(b)) continue;
			seen.add(a);
			seen.add(b);
			grew = true;
		}
	}
	return seen.size === n;
};

/** Removes each connection in turn and checks the network still holds together. */
const byBruteForce = (n: number, edges: number[][]): string[] =>
	edges
		.filter(
			(_, i) =>
				!connected(
					n,
					edges.filter((__, j) => j !== i),
				),
		)
		.map(([a = 0, b = 0]) => `${Math.min(a, b)},${Math.max(a, b)}`)
		.sort();

const normalise = (edges: number[][]): string[] =>
	edges.map(([a = 0, b = 0]) => `${Math.min(a, b)},${Math.max(a, b)}`).sort();

describe("1192. Critical Connections in a Network", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			normalise(
				criticalConnections(4, [
					[0, 1],
					[1, 2],
					[2, 0],
					[1, 3],
				]),
			),
		).toEqual(["1,3"]);
		expect(normalise(criticalConnections(2, [[0, 1]]))).toEqual(["0,1"]);
	});

	it("handles a long path without overflowing the stack", () => {
		const n = 100000;
		const path = Array.from({ length: n - 1 }, (_, i) => [i, i + 1]);
		expect(criticalConnections(n, path)).toHaveLength(n - 1);
		expect(criticalConnections(n, [...path, [n - 1, 0]])).toEqual([]);
	});

	it("matches removing each connection on random networks", () => {
		const random = createRandom(1192);
		for (let run = 0; run < 300; run++) {
			const n = random.int(2, 8);
			const pairs = new Set<string>();
			for (let v = 1; v < n; v++) pairs.add(`${random.int(0, v - 1)},${v}`);
			for (let extra = random.int(0, 4); extra > 0; extra--) {
				const [a, b] = [random.int(0, n - 1), random.int(0, n - 1)];
				if (a !== b && !pairs.has(`${b},${a}`)) pairs.add(`${a},${b}`);
			}
			const edges = [...pairs].map((pair) => pair.split(",").map(Number));
			expect(normalise(criticalConnections(n, edges))).toEqual(
				byBruteForce(n, edges),
			);
		}
	});
});
