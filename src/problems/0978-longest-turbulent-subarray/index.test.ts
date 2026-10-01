import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestTurbulentSubarray as maxTurbulenceSize } from ".";

const isTurbulent = (values: number[]): boolean =>
	values.every((value, i) => {
		if (i < 2) return i === 0 || value !== values[i - 1];
		return (
			Math.sign(value - (values[i - 1] ?? 0)) ===
				-Math.sign((values[i - 1] ?? 0) - (values[i - 2] ?? 0)) &&
			value !== values[i - 1]
		);
	});

describe("978. Longest Turbulent Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9])).toBe(5);
		expect(maxTurbulenceSize([4, 8, 12, 16])).toBe(2);
		expect(maxTurbulenceSize([100])).toBe(1);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(978);
		for (let run = 0; run < 1000; run++) {
			const arr = random.array(random.int(1, 12), 0, 4);
			let expected = 1;
			for (let i = 0; i < arr.length; i++)
				for (let j = i + 1; j <= arr.length; j++)
					if (isTurbulent(arr.slice(i, j)))
						expected = Math.max(expected, j - i);
			expect(maxTurbulenceSize(arr)).toBe(expected);
		}
	});
});
