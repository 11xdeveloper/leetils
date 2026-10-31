import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfGoodNodes as countGoodNodes } from ".";

describe("3249. Count the Number of Good Nodes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countGoodNodes([
				[0, 1],
				[0, 2],
				[1, 3],
				[1, 4],
				[2, 5],
				[2, 6],
			]),
		).toBe(7);
		expect(
			countGoodNodes([
				[0, 1],
				[1, 2],
				[2, 3],
				[3, 4],
				[0, 5],
				[1, 6],
				[2, 7],
				[3, 8],
			]),
		).toBe(6);
		expect(
			countGoodNodes([
				[6, 0],
				[1, 0],
				[5, 1],
				[2, 5],
				[3, 1],
				[4, 3],
			]),
		).toBe(6);
	});
});

describe("3249. Count the Number of Good Nodes on random trees", () => {
	it("matches recursion", () => {
		const random = createRandom(3249);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 12);
			const edges = Array.from({ length: n - 1 }, (_, i) => [
				random.int(0, i),
				i + 1,
			]);
			const children: number[][] = Array.from({ length: n }, () => []);
			for (const [u = 0, v = 0] of edges) children[u]?.push(v);
			let good = 0;
			const size = (node: number): number => {
				const sizes = (children[node] ?? []).map(size);
				if (new Set(sizes).size <= 1) good++;
				return 1 + sizes.reduce((a, b) => a + b, 0);
			};
			size(0);
			expect(countGoodNodes(edges)).toBe(good);
		}
	});
});
