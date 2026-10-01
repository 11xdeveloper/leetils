import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { restoreTheArrayFromAdjacentPairs as restoreArray } from ".";

const eitherWay = (result: number[], expected: number[]) =>
	expect([expected, expected.toReversed()]).toContainEqual(result);

describe("1743. Restore the Array From Adjacent Pairs", () => {
	it("solves the examples from the problem statement", () => {
		eitherWay(
			restoreArray([
				[2, 1],
				[3, 4],
				[3, 2],
			]),
			[1, 2, 3, 4],
		);
		eitherWay(
			restoreArray([
				[4, -2],
				[1, 4],
				[-3, 1],
			]),
			[-2, 4, 1, -3],
		);
		eitherWay(restoreArray([[100000, -100000]]), [100000, -100000]);
	});

	it("restores shuffled pairs of random arrays", () => {
		const random = createRandom(1743);
		for (let run = 0; run < 200; run++) {
			const nums = [...new Set(random.array(random.int(2, 12), -50, 50))];
			if (nums.length < 2) continue;
			const pairs = nums
				.slice(1)
				.map((value, i) =>
					random.int(0, 1) ? [nums[i] ?? 0, value] : [value, nums[i] ?? 0],
				);
			for (let i = pairs.length - 1; i > 0; i--) {
				const j = random.int(0, i);
				[pairs[i], pairs[j]] = [pairs[j] ?? [], pairs[i] ?? []];
			}
			eitherWay(restoreArray(pairs), nums);
		}
	});
});
