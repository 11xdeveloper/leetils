import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutations } from "../0046-permutations";
import { validateStackSequences } from ".";

describe("946. Validate Stack Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1])).toBeTrue();
		expect(
			validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]),
		).toBeFalse();
	});

	it("accepts exactly the Catalan number of pop orders", () => {
		const catalan = [1, 1, 2, 5, 14, 42, 132];
		for (let n = 1; n <= 6; n++) {
			const pushed = Array.from({ length: n }, (_, i) => i);
			expect(
				permutations(pushed).filter((popped) =>
					validateStackSequences(pushed, popped),
				).length,
			).toBe(catalan[n] ?? 0);
		}
	});

	it("accepts pop orders made by random pushes and pops", () => {
		const random = createRandom(946);
		for (let run = 0; run < 500; run++) {
			const pushed = Array.from(
				{ length: random.int(1, 10) },
				(_, i) => i,
			).sort(() => random.next() - 0.5);
			const stack: number[] = [];
			const popped: number[] = [];
			for (const value of pushed) {
				stack.push(value);
				while (stack.length > 0 && random.int(0, 1))
					popped.push(stack.pop() ?? 0);
			}
			popped.push(...stack.reverse());
			expect(validateStackSequences(pushed, popped)).toBeTrue();
		}
	});
});
