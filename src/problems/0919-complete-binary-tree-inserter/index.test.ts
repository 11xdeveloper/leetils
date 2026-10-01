import { describe, expect, it } from "bun:test";
import { treeFromArray, treeToArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { CompleteBinaryTreeInserter as CBTInserter } from ".";

describe("919. Complete Binary Tree Inserter", () => {
	it("solves the example from the problem statement", () => {
		const inserter = new CBTInserter(treeFromArray([1, 2]));
		expect(inserter.insert(3)).toBe(1);
		expect(inserter.insert(4)).toBe(2);
		expect(treeToArray(inserter.get_root())).toEqual([1, 2, 3, 4]);
	});

	it("keeps random complete trees complete, in level order", () => {
		const random = createRandom(919);
		for (let run = 0; run < 200; run++) {
			const initial = random.array(random.int(1, 10), 0, 99);
			const inserter = new CBTInserter(treeFromArray(initial));
			const values = [...initial];
			for (let i = 0; i < 10; i++) {
				const val = random.int(0, 99);
				expect(inserter.insert(val)).toBe(
					values[Math.floor((values.length - 1) / 2)] ?? -1,
				);
				values.push(val);
			}
			expect(treeToArray(inserter.get_root())).toEqual(values);
		}
	});
});
