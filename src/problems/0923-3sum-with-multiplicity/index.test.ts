import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { threeSumWithMultiplicity as threeSumMulti } from ".";

describe("923. 3Sum With Multiplicity", () => {
	it("solves the examples from the problem statement", () => {
		expect(threeSumMulti([1, 1, 2, 2, 3, 3, 4, 4, 5, 5], 8)).toBe(20);
		expect(threeSumMulti([1, 1, 2, 2, 2, 2], 5)).toBe(12);
		expect(threeSumMulti([2, 1, 3], 6)).toBe(1);
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(923);
		for (let run = 0; run < 500; run++) {
			const arr = random.array(random.int(3, 20), 0, 6);
			const target = random.int(0, 18);
			let expected = 0;
			for (let i = 0; i < arr.length; i++) {
				for (let j = i + 1; j < arr.length; j++)
					for (let k = j + 1; k < arr.length; k++)
						if ((arr[i] ?? 0) + (arr[j] ?? 0) + (arr[k] ?? 0) === target)
							expected++;
			}
			expect(threeSumMulti(arr, target)).toBe(expected);
		}
	});

	it("reduces large counts modulo 10^9 + 7", () => {
		expect(threeSumMulti(new Array(3000).fill(0), 0)).toBe(
			((3000 * 2999 * 2998) / 6) % 1_000_000_007,
		);
	});
});
