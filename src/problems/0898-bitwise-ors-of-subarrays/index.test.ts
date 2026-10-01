import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bitwiseOrsOfSubarrays as subarrayBitwiseORs } from ".";

describe("898. Bitwise ORs of Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(subarrayBitwiseORs([0])).toBe(1);
		expect(subarrayBitwiseORs([1, 1, 2])).toBe(3);
		expect(subarrayBitwiseORs([1, 2, 4])).toBe(6);
	});

	it("matches ORing every subarray on random inputs", () => {
		const random = createRandom(898);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(1, 12), 0, 31);
			const all = new Set<number>();
			for (let i = 0; i < arr.length; i++) {
				let or = 0;
				for (let j = i; j < arr.length; j++) {
					or |= arr[j] ?? 0;
					all.add(or);
				}
			}
			expect(subarrayBitwiseORs(arr)).toBe(all.size);
		}
	});
});
