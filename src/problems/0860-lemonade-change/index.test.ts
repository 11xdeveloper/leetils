import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lemonadeChange } from ".";

/** Tries both ways of changing a 20 whenever there's a choice. */
const byBruteForce = (bills: number[], fives = 0, tens = 0): boolean => {
	const [bill, ...rest] = bills;
	if (bill === undefined) return true;
	if (bill === 5) return byBruteForce(rest, fives + 1, tens);
	if (bill === 10) return fives > 0 && byBruteForce(rest, fives - 1, tens + 1);
	return (
		(tens > 0 && fives > 0 && byBruteForce(rest, fives - 1, tens - 1)) ||
		(fives >= 3 && byBruteForce(rest, fives - 3, tens))
	);
};

describe("860. Lemonade Change", () => {
	it("solves the examples from the problem statement", () => {
		expect(lemonadeChange([5, 5, 5, 10, 20])).toBeTrue();
		expect(lemonadeChange([5, 5, 10, 10, 20])).toBeFalse();
	});

	it("matches trying every way of giving change on random queues", () => {
		const random = createRandom(860);
		for (let run = 0; run < 1000; run++) {
			const bills = Array.from(
				{ length: random.int(1, 12) },
				() => [5, 5, 10, 20][random.int(0, 3)] ?? 5,
			);
			expect(lemonadeChange(bills)).toBe(byBruteForce(bills));
		}
	});
});
