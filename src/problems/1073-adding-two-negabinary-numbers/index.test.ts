import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { convertToBase2 } from "../1017-convert-to-base-2";
import { addingTwoNegabinaryNumbers as addNegabinary } from ".";

const value = (bits: number[]): number =>
	bits.reduceRight(
		(total, bit, i) => total + bit * (-2) ** (bits.length - 1 - i),
		0,
	);

describe("1073. Adding Two Negabinary Numbers", () => {
	it("solves the examples from the problem statement", () => {
		expect(addNegabinary([1, 1, 1, 1, 1], [1, 0, 1])).toEqual([1, 0, 0, 0, 0]);
		expect(addNegabinary([0], [0])).toEqual([0]);
		expect(addNegabinary([0], [1])).toEqual([1]);
	});

	it("matches converting the sum on random inputs", () => {
		const random = createRandom(1073);
		for (let run = 0; run < 1000; run++) {
			const a = [...convertToBase2(random.int(0, 5000))].map(Number);
			const b = [...convertToBase2(random.int(0, 5000))].map(Number);
			expect(addNegabinary(a, b).join("")).toBe(
				convertToBase2(value(a) + value(b)),
			);
		}
	});
});
