import { describe, expect, it } from "bun:test";
import { fizzBuzz } from ".";

describe("412. Fizz Buzz", () => {
	it("solves the examples from the problem statement", () => {
		expect(fizzBuzz(3)).toEqual(["1", "2", "Fizz"]);
		expect(fizzBuzz(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
		expect(fizzBuzz(15).at(-1)).toBe("FizzBuzz");
	});

	it("follows the rules for every number up to 10,000", () => {
		for (const [i, word] of fizzBuzz(10_000).entries()) {
			const n = i + 1;
			expect(word).toBe(
				n % 15 === 0
					? "FizzBuzz"
					: n % 3 === 0
						? "Fizz"
						: n % 5 === 0
							? "Buzz"
							: String(n),
			);
		}
	});
});
