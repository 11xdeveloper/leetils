import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { TwoSumIIIDataStructureDesign } from ".";

describe("170. Two Sum III - Data structure design", () => {
	it("solves the example from the problem statement", () => {
		const twoSum = new TwoSumIIIDataStructureDesign();
		twoSum.add(1);
		twoSum.add(3);
		twoSum.add(5);
		expect(twoSum.find(4)).toBeTrue();
		expect(twoSum.find(7)).toBeFalse();
	});

	it("only pairs a number with itself when it was added twice", () => {
		const twoSum = new TwoSumIIIDataStructureDesign();
		twoSum.add(3);
		expect(twoSum.find(6)).toBeFalse();
		twoSum.add(3);
		expect(twoSum.find(6)).toBeTrue();
	});

	it("finds nothing when empty", () => {
		expect(new TwoSumIIIDataStructureDesign().find(0)).toBeFalse();
	});

	it("matches checking every pair on random operations", () => {
		const random = createRandom(170);
		for (let run = 0; run < 100; run++) {
			const twoSum = new TwoSumIIIDataStructureDesign();
			const added: number[] = [];
			for (let step = 0; step < 50; step++) {
				if (random.int(0, 1) === 0) {
					const number = random.int(-5, 5);
					twoSum.add(number);
					added.push(number);
				} else {
					const value = random.int(-10, 10);
					const expected = added.some((a, i) =>
						added.some((b, j) => i !== j && a + b === value),
					);
					expect(twoSum.find(value)).toBe(expected);
				}
			}
		}
	});
});
