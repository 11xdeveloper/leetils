import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfProvinces as findCircleNum } from ".";

/** Counts depth-first searches needed to visit every city. */
const bySearch = (isConnected: number[][]): number => {
	const seen = new Set<number>();
	let provinces = 0;
	for (let start = 0; start < isConnected.length; start++) {
		if (seen.has(start)) continue;
		provinces++;
		const stack = [start];
		seen.add(start);
		for (let city = stack.pop(); city !== undefined; city = stack.pop()) {
			for (const [other, linked] of (isConnected[city] ?? []).entries()) {
				if (linked === 1 && !seen.has(other)) {
					seen.add(other);
					stack.push(other);
				}
			}
		}
	}
	return provinces;
};

describe("547. Number of Provinces", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findCircleNum([
				[1, 1, 0],
				[1, 1, 0],
				[0, 0, 1],
			]),
		).toBe(2);
		expect(
			findCircleNum([
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
			]),
		).toBe(3);
	});

	it("matches depth-first search on random graphs", () => {
		const random = createRandom(547);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 10);
			const isConnected = Array.from({ length: n }, (_, i) =>
				Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
			);
			for (let edges = random.int(0, n); edges > 0; edges--) {
				const a = random.int(0, n - 1);
				const b = random.int(0, n - 1);
				const rowA = isConnected[a];
				const rowB = isConnected[b];
				if (rowA && rowB) {
					rowA[b] = 1;
					rowB[a] = 1;
				}
			}
			expect(findCircleNum(isConnected)).toBe(bySearch(isConnected));
		}
	});
});
