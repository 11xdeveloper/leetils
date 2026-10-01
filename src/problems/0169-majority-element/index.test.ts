import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { majorityElement } from ".";

describe("169. Majority Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(majorityElement([3, 2, 3])).toBe(3);
		expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2);
	});

	it("handles a single element", () => {
		expect(majorityElement([-7])).toBe(-7);
	});

	it("finds the majority in random shuffled arrays", () => {
		const random = createRandom(169);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 21);
			const majority = random.int(-5, 5);
			const count = random.int(Math.floor(n / 2) + 1, n);
			const others = random
				.array(n - count, -5, 5)
				.map((v) => (v === majority ? v + 11 : v));
			const nums = [
				...new Array<number>(count).fill(majority),
				...others,
			].toSorted(() => random.next() - 0.5);
			expect(majorityElement(nums)).toBe(majority);
		}
	});
});
