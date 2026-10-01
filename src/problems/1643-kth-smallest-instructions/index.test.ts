import { describe, expect, it } from "bun:test";
import { kthSmallestInstructions as kthSmallestPath } from ".";

/** Every move string in sorted order. */
const allPaths = (v: number, h: number): string[] => {
	if (v === 0) return ["H".repeat(h)];
	if (h === 0) return ["V".repeat(v)];
	return [
		...allPaths(v, h - 1).map((path) => `H${path}`),
		...allPaths(v - 1, h).map((path) => `V${path}`),
	];
};

describe("1643. Kth Smallest Instructions", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthSmallestPath([2, 3], 1)).toBe("HHHVV");
		expect(kthSmallestPath([2, 3], 2)).toBe("HHVHV");
		expect(kthSmallestPath([2, 3], 3)).toBe("HHVVH");
	});

	it("matches listing every path for small destinations", () => {
		for (let v = 0; v <= 4; v++) {
			for (let h = 0; h <= 4; h++) {
				if (v + h === 0) continue;
				const paths = allPaths(v, h);
				for (const [i, path] of paths.entries())
					expect(kthSmallestPath([v, h], i + 1)).toBe(path);
			}
		}
	});

	it("handles the largest destination", () => {
		expect(kthSmallestPath([15, 15], 1)).toBe(
			`${"H".repeat(15)}${"V".repeat(15)}`,
		);
		expect(kthSmallestPath([15, 15], 155117520)).toBe(
			`${"V".repeat(15)}${"H".repeat(15)}`,
		);
	});
});
