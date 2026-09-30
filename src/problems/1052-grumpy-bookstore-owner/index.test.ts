import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { grumpyBookstoreOwner as maxSatisfied } from ".";

describe("1052. Grumpy Bookstore Owner", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3),
		).toBe(16);
		expect(maxSatisfied([1], [0], 1)).toBe(1);
	});

	it("matches trying every calm window on random days", () => {
		const random = createRandom(1052);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 12);
			const customers = random.array(n, 0, 9);
			const grumpy = random.array(n, 0, 1);
			const minutes = random.int(1, n);
			let expected = 0;
			for (let start = 0; start + minutes <= n; start++) {
				expected = Math.max(
					expected,
					customers.reduce(
						(total, count, i) =>
							total +
							(grumpy[i] === 0 || (i >= start && i < start + minutes)
								? count
								: 0),
						0,
					),
				);
			}
			expect(maxSatisfied(customers, grumpy, minutes)).toBe(expected);
		}
	});
});
