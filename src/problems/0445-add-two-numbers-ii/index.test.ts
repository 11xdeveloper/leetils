import { describe, expect, it } from "bun:test";
import { listFromArray, listToArray } from "../../structures/list-node";
import { createRandom } from "../../testing/random";
import { addTwoNumbersII } from ".";

const add = (a: number[], b: number[]): number[] =>
	listToArray(addTwoNumbersII(listFromArray(a), listFromArray(b)));

describe("445. Add Two Numbers II", () => {
	it("solves the examples from the problem statement", () => {
		expect(add([7, 2, 4, 3], [5, 6, 4])).toEqual([7, 8, 0, 7]);
		expect(add([2, 4, 3], [5, 6, 4])).toEqual([8, 0, 7]);
		expect(add([0], [0])).toEqual([0]);
	});

	it("does not modify the input lists", () => {
		const l1 = listFromArray([9, 9]);
		addTwoNumbersII(l1, listFromArray([1]));
		expect(listToArray(l1)).toEqual([9, 9]);
	});

	it("agrees with BigInt addition on random numbers", () => {
		const random = createRandom(445);
		for (let run = 0; run < 1000; run++) {
			const a = [random.int(1, 9), ...random.array(random.int(0, 20), 0, 9)];
			const b = [random.int(1, 9), ...random.array(random.int(0, 20), 0, 9)];
			expect(add(a, b).join("")).toBe(
				String(BigInt(a.join("")) + BigInt(b.join(""))),
			);
		}
	});
});
