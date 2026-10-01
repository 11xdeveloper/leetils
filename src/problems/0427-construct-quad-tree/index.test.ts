import { describe, expect, it } from "bun:test";
import {
	type QuadTreeNode,
	quadTreeToArray,
} from "../../structures/quad-tree-node";
import { createRandom } from "../../testing/random";
import { constructQuadTree } from ".";

/** Paints the grid back from the tree. */
const paint = (node: QuadTreeNode | null, size: number): number[][] => {
	const grid = Array.from({ length: size }, () =>
		new Array<number>(size).fill(-1),
	);
	const fill = (
		n: QuadTreeNode | null,
		top: number,
		left: number,
		s: number,
	): void => {
		if (!n) return;
		if (n.isLeaf) {
			for (let r = top; r < top + s; r++)
				for (let c = left; c < left + s; c++)
					(grid[r] ?? [])[c] = n.val ? 1 : 0;
			return;
		}
		const h = s / 2;
		fill(n.topLeft, top, left, h);
		fill(n.topRight, top, left + h, h);
		fill(n.bottomLeft, top + h, left, h);
		fill(n.bottomRight, top + h, left + h, h);
	};
	fill(node, 0, 0, size);
	return grid;
};

/** No internal node's four children are leaves of one value (they'd have merged). */
const isMinimal = (node: QuadTreeNode | null): boolean => {
	if (!node || node.isLeaf) return true;
	const children = [
		node.topLeft,
		node.topRight,
		node.bottomLeft,
		node.bottomRight,
	];
	const mergeable = children.every(
		(c) => c?.isLeaf && c.val === children[0]?.val,
	);
	return !mergeable && children.every(isMinimal);
};

describe("427. Construct Quad Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			quadTreeToArray(
				constructQuadTree([
					[0, 1],
					[1, 0],
				]),
			),
		).toEqual([
			[0, 1],
			[1, 0],
			[1, 1],
			[1, 1],
			[1, 0],
		]);
		const grid = [
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 1, 1, 0, 0, 0, 0],
		];
		expect(quadTreeToArray(constructQuadTree(grid))).toEqual([
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
	});

	it("represents random grids exactly, with no mergeable quarters", () => {
		const random = createRandom(427);
		for (let run = 0; run < 300; run++) {
			const size = 2 ** random.int(0, 4);
			const grid = Array.from({ length: size }, () =>
				random.int(0, 3) === 0
					? random.array(size, 0, 1)
					: new Array<number>(size).fill(random.int(0, 1)),
			);
			const tree = constructQuadTree(grid);
			expect(paint(tree, size)).toEqual(grid);
			expect(isMinimal(tree)).toBeTrue();
		}
	});
});
