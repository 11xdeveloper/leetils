import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { duplicateZeros } from ".";

const apply = (arr: number[]): number[] => {
	const copy = [...arr];
	duplicateZeros(copy);
	return copy;
};

describe("1089. Duplicate Zeros", () => {
	it("solves the examples from the problem statement", () => {
		expect(apply([1, 0, 2, 3, 0, 4, 5, 0])).toEqual([1, 0, 0, 2, 3, 0, 0, 4]);
		expect(apply([1, 2, 3])).toEqual([1, 2, 3]);
	});

	it("matches building the expanded array on random inputs", () => {
		const random = createRandom(1089);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(1, 12), 0, 3);
			expect(apply(arr)).toEqual(
				arr.flatMap((x) => (x === 0 ? [0, 0] : [x])).slice(0, arr.length),
			);
		}
	});
});
