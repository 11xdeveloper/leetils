import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfSortableIntegers as sortableIntegers } from ".";

/** Tries every rotation of every block. */
const byBruteForce = (nums: number[]): number => {
	const n = nums.length;
	let total = 0;
	for (let k = 1; k <= n; k++) {
		if (n % k !== 0) continue;
		const blocks = Array.from({ length: n / k }, (_, b) =>
			nums.slice(b * k, b * k + k),
		);
		const sortedBlocks = blocks.map((block) => {
			for (let r = 0; r < k; r++) {
				const rotated = [...block.slice(r), ...block.slice(0, r)];
				if (rotated.every((x, i) => i === 0 || (rotated[i - 1] ?? 0) <= x))
					return rotated;
			}
			return undefined;
		});
		if (sortedBlocks.some((b) => !b)) continue;
		const flat = sortedBlocks.flatMap((b) => b ?? []);
		if (flat.every((x, i) => i === 0 || (flat[i - 1] ?? 0) <= x)) total += k;
	}
	return total;
};

describe("3886. Sum of Sortable Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortableIntegers([3, 1, 2])).toBe(3);
		expect(sortableIntegers([7, 6, 5])).toBe(0);
		expect(sortableIntegers([5, 8])).toBe(3);
	});

	it("matches trying every rotation on random arrays", () => {
		const random = createRandom(3886);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 4);
			expect(sortableIntegers(nums)).toBe(byBruteForce(nums));
		}
	});
});
