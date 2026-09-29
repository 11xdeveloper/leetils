import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pathSumIV as pathSum } from ".";

/** Walks every root-to-leaf path explicitly. */
const byPaths = (nums: number[]): number => {
	const values = new Map(nums.map((num) => [Math.floor(num / 10), num % 10]));
	const walk = (depth: number, position: number, sum: number): number => {
		const value = values.get(depth * 10 + position);
		if (value === undefined) return 0;
		const left = values.has((depth + 1) * 10 + 2 * position - 1);
		const right = values.has((depth + 1) * 10 + 2 * position);
		if (!left && !right) return sum + value;
		return (
			walk(depth + 1, 2 * position - 1, sum + value) +
			walk(depth + 1, 2 * position, sum + value)
		);
	};
	return walk(1, 1, 0);
};

describe("666. Path Sum IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(pathSum([113, 215, 221])).toBe(12);
		expect(pathSum([113, 221])).toBe(4);
	});

	it("matches walking every path on random trees", () => {
		const random = createRandom(666);
		for (let run = 0; run < 1000; run++) {
			const nums = [110 + random.int(0, 9)];
			// Add random children of existing nodes, level by level.
			for (let depth = 2; depth <= 4; depth++) {
				for (const parent of nums.filter(
					(num) => Math.floor(num / 100) === depth - 1,
				)) {
					const position = Math.floor(parent / 10) % 10;
					for (const child of [2 * position - 1, 2 * position]) {
						if (random.int(0, 2) > 0)
							nums.push(depth * 100 + child * 10 + random.int(0, 9));
					}
				}
			}
			nums.sort((a, b) => a - b);
			expect(pathSum(nums)).toBe(byPaths(nums));
		}
	});
});
