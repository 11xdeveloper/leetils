import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { fourDivisors as sumFourDivisors } from ".";

describe("1390. Four Divisors", () => {
	it("solves the examples from the problem statement", () => {
		expect(sumFourDivisors([21, 4, 7])).toBe(32);
		expect(sumFourDivisors([21, 21])).toBe(64);
		expect(sumFourDivisors([1, 2, 3, 4, 5])).toBe(0);
	});

	it("counts cubes of primes, which have four divisors", () => {
		expect(sumFourDivisors([8, 27])).toBe(15 + 40);
	});

	it("matches listing every divisor on random inputs", () => {
		const random = createRandom(1390);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 10), 1, 2000);
			const expected = nums.reduce((sum, num) => {
				const divisors = Array.from({ length: num }, (_, i) => i + 1).filter(
					(d) => num % d === 0,
				);
				return divisors.length === 4
					? sum + divisors.reduce((s, d) => s + d, 0)
					: sum;
			}, 0);
			expect(sumFourDivisors(nums)).toBe(expected);
		}
	});
});
