import { describe, expect, it } from "bun:test";
import { pathInZigzagLabelledBinaryTree as pathInZigZagTree } from ".";

/** Lays the rows out explicitly: the node at position p has its parent at ⌊p / 2⌋. */
const byBruteForce = (label: number): number[] => {
	const rows: number[][] = [];
	for (let depth = 0; 2 ** depth <= label; depth++) {
		const row = Array.from({ length: 2 ** depth }, (_, i) => 2 ** depth + i);
		rows.push(depth % 2 === 0 ? row : row.reverse());
	}
	let depth = rows.length - 1;
	let position = rows[depth]?.indexOf(label) ?? 0;
	const path: number[] = [];
	for (; depth >= 0; depth--) {
		path.push(rows[depth]?.[position] ?? 0);
		position = Math.floor(position / 2);
	}
	return path.reverse();
};

describe("1104. Path In Zigzag Labelled Binary Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(pathInZigZagTree(14)).toEqual([1, 3, 4, 14]);
		expect(pathInZigZagTree(26)).toEqual([1, 2, 6, 10, 26]);
	});

	it("handles the root and the ends of rows", () => {
		expect(pathInZigZagTree(1)).toEqual([1]);
		expect(pathInZigZagTree(2)).toEqual([1, 2]);
		expect(pathInZigZagTree(3)).toEqual([1, 3]);
		expect(pathInZigZagTree(2 ** 19)).toEqual(byBruteForce(2 ** 19));
		expect(pathInZigZagTree(2 ** 20 - 1)).toEqual(byBruteForce(2 ** 20 - 1));
	});

	it("matches laying out the rows for every label up to 1024", () => {
		for (let label = 1; label <= 1024; label++) {
			expect(pathInZigZagTree(label)).toEqual(byBruteForce(label));
		}
	});
});
