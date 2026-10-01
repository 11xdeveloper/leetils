import { describe, expect, it } from "bun:test";
import { treeFromArray } from "../../structures/tree-node";
import { createRandom } from "../../testing/random";
import { bstFromValues } from "../../testing/trees";
import { twoSumBsts as twoSumBSTs } from ".";

describe("1214. Two Sum BSTs", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			twoSumBSTs(treeFromArray([2, 1, 4]), treeFromArray([1, 0, 3]), 5),
		).toBeTrue();
		expect(
			twoSumBSTs(
				treeFromArray([0, -10, 10]),
				treeFromArray([5, 1, 7, 0, 2]),
				18,
			),
		).toBeFalse();
	});

	it("handles deep trees", () => {
		const chain = Array.from({ length: 5000 }, (_, i) => i);
		expect(
			twoSumBSTs(bstFromValues(chain), bstFromValues(chain), 9997),
		).toBeTrue();
		expect(
			twoSumBSTs(bstFromValues(chain), bstFromValues(chain), 9999),
		).toBeFalse();
	});

	it("matches checking every pair on random trees", () => {
		const random = createRandom(1214);
		for (let run = 0; run < 300; run++) {
			const a = random.array(random.int(1, 10), -20, 20);
			const b = random.array(random.int(1, 10), -20, 20);
			const target = random.int(-30, 30);
			expect(twoSumBSTs(bstFromValues(a), bstFromValues(b), target)).toBe(
				a.some((x) => b.some((y) => x + y === target)),
			);
		}
	});
});
