import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfAlternatingXorPartitions as alternatingXOR } from ".";

/** Tries every set of cuts. */
const byBruteForce = (nums: number[], t1: number, t2: number): number => {
	const n = nums.length;
	let count = 0;
	for (let mask = 0; mask < 1 << (n - 1); mask++) {
		let [x, block, ok] = [0, 0, true];
		nums.forEach((num, i) => {
			x ^= num;
			if (i === n - 1 || (mask >> i) & 1) {
				if (x !== (block % 2 === 0 ? t1 : t2)) ok = false;
				[x, block] = [0, block + 1];
			}
		});
		if (ok) count++;
	}
	return count;
};

describe("3811. Number of Alternating XOR Partitions", () => {
	it("solves the examples from the problem statement", () => {
		expect(alternatingXOR([2, 3, 1, 4], 1, 5)).toBe(1);
		expect(alternatingXOR([1, 0, 0], 1, 0)).toBe(3);
		expect(alternatingXOR([7], 1, 7)).toBe(0);
	});

	it("matches trying every set of cuts on random arrays", () => {
		const random = createRandom(3811);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 3);
			const t1 = random.int(0, 3);
			const t2 = (t1 + random.int(1, 3)) % 4;
			expect(alternatingXOR(nums, t1, t2)).toBe(byBruteForce(nums, t1, t2));
		}
	});
});
