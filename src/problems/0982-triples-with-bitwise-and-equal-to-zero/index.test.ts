import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { triplesWithBitwiseAndEqualToZero as countTriplets } from ".";

describe("982. Triples with Bitwise AND Equal To Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(countTriplets([2, 1, 3])).toBe(12);
		expect(countTriplets([0, 0, 0])).toBe(27);
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(982);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 15);
			let expected = 0;
			for (const a of nums)
				for (const b of nums)
					for (const c of nums) if ((a & b & c) === 0) expected++;
			expect(countTriplets(nums)).toBe(expected);
		}
	});
});
