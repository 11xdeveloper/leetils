import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countOfIntegers as count } from ".";

/** Checks every integer in the range. */
const byBruteForce = (
	a: number,
	b: number,
	low: number,
	high: number,
): number => {
	let total = 0;
	for (let x = a; x <= b; x++) {
		const sum = [...String(x)].reduce((s, d) => s + Number(d), 0);
		if (sum >= low && sum <= high) total++;
	}
	return total;
};

describe("2719. Count of Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(count("1", "12", 1, 8)).toBe(11);
		expect(count("1", "5", 1, 5)).toBe(5);
	});

	it("matches checking every integer on random ranges", () => {
		const random = createRandom(2719);
		for (let run = 0; run < 300; run++) {
			const a = random.int(1, 3000);
			const b = random.int(a, 3500);
			const low = random.int(1, 20);
			const high = random.int(low, 30);
			expect(count(String(a), String(b), low, high)).toBe(
				byBruteForce(a, b, low, high),
			);
		}
	});
});
