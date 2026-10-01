import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { productOfTwoRunLengthEncodedArrays as findRLEArray } from ".";

const expand = (encoded: number[][]) =>
	encoded.flatMap(([value = 0, frequency = 0]) =>
		new Array<number>(frequency).fill(value),
	);
const compress = (nums: number[]) => {
	const runs: number[][] = [];
	for (const num of nums) {
		const last = runs.at(-1);
		if (last && last[0] === num) last[1] = (last[1] ?? 0) + 1;
		else runs.push([num, 1]);
	}
	return runs;
};

describe("1868. Product of Two Run-Length Encoded Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findRLEArray(
				[
					[1, 3],
					[2, 3],
				],
				[
					[6, 3],
					[3, 3],
				],
			),
		).toEqual([[6, 6]]);
		expect(
			findRLEArray(
				[
					[1, 3],
					[2, 1],
					[3, 2],
				],
				[
					[2, 3],
					[3, 3],
				],
			),
		).toEqual([
			[2, 3],
			[6, 1],
			[9, 2],
		]);
	});

	it("matches expanding both arrays on random inputs", () => {
		const random = createRandom(1868);
		for (let run = 0; run < 200; run++) {
			const a = compress(random.array(random.int(1, 15), 1, 3));
			const values = expand(a).map(() => random.int(1, 3));
			const b = compress(values);
			expect(findRLEArray(a, b)).toEqual(
				compress(expand(a).map((v, i) => v * (values[i] ?? 0))),
			);
		}
	});
});
