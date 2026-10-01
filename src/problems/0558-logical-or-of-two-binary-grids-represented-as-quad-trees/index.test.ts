import { describe, expect, it } from "bun:test";
import {
	type QuadTreeNode,
	quadTreeFromArray,
	quadTreeToArray,
} from "../../structures/quad-tree-node";
import { createRandom } from "../../testing/random";
import { constructQuadTree } from "../0427-construct-quad-tree";
import { logicalOrOfTwoBinaryGridsRepresentedAsQuadTrees as intersect } from ".";

/** Fills in the grid a quad tree describes. */
const toGrid = (node: QuadTreeNode | null, size: number): number[][] => {
	const grid = Array.from({ length: size }, () =>
		new Array<number>(size).fill(0),
	);
	const fill = (
		current: QuadTreeNode | null,
		row: number,
		col: number,
		width: number,
	): void => {
		if (!current) return;
		if (current.isLeaf) {
			for (let r = row; r < row + width; r++)
				for (let c = col; c < col + width; c++)
					(grid[r] ?? [])[c] = current.val ? 1 : 0;
			return;
		}
		const half = width / 2;
		fill(current.topLeft, row, col, half);
		fill(current.topRight, row, col + half, half);
		fill(current.bottomLeft, row + half, col, half);
		fill(current.bottomRight, row + half, col + half, half);
	};
	fill(node, 0, 0, size);
	return grid;
};

describe("558. Logical OR of Two Binary Grids Represented as Quad-Trees", () => {
	it("solves the examples from the problem statement", () => {
		const a = quadTreeFromArray([
			[0, 1],
			[1, 1],
			[1, 1],
			[1, 0],
			[1, 0],
		]);
		const b = quadTreeFromArray([
			[0, 1],
			[1, 1],
			[0, 1],
			[1, 1],
			[1, 0],
			null,
			null,
			null,
			null,
			[1, 0],
			[1, 0],
			[1, 1],
			[1, 1],
		]);
		// Internal nodes may have either value, so LeetCode's [0, 0] matches [0, 1] here.
		expect(quadTreeToArray(intersect(a, b))).toEqual([
			[0, 1],
			[1, 1],
			[1, 1],
			[1, 1],
			[1, 0],
		]);
		expect(
			quadTreeToArray(
				intersect(quadTreeFromArray([[1, 0]]), quadTreeFromArray([[1, 0]])),
			),
		).toEqual([[1, 0]]);
	});

	it("matches ORing the grids and rebuilding the tree on random grids", () => {
		const random = createRandom(558);
		for (let run = 0; run < 500; run++) {
			const size = 2 ** random.int(0, 3);
			// Blocks of equal cells make merged leaves common.
			const block = 2 ** random.int(0, Math.log2(size));
			const randomGrid = () => {
				const cells = Array.from({ length: (size / block) ** 2 }, () =>
					random.int(0, 1),
				);
				return Array.from({ length: size }, (_, r) =>
					Array.from(
						{ length: size },
						(_, c) =>
							cells[
								Math.floor(r / block) * (size / block) + Math.floor(c / block)
							] ?? 0,
					),
				);
			};
			const a = randomGrid();
			const b = randomGrid();
			const expected = a.map((row, r) =>
				row.map((cell, c) => cell | (b[r]?.[c] ?? 0)),
			);
			const result = intersect(constructQuadTree(a), constructQuadTree(b));
			expect(toGrid(result, size)).toEqual(expected);
			expect(quadTreeToArray(result)).toEqual(
				quadTreeToArray(constructQuadTree(expected)),
			);
		}
	});
});
