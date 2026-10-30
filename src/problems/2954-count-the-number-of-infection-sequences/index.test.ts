import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfInfectionSequences as numberOfSequence } from ".";

/** Explores every infection order. */
const byBruteForce = (n: number, sick: number[]): number => {
	const infected = Array.from({ length: n }, (_, i) => sick.includes(i));
	const count = (): number => {
		const options = infected
			.map((_, i) => i)
			.filter((i) => !infected[i] && (infected[i - 1] || infected[i + 1]));
		if (options.length === 0) return 1;
		let total = 0;
		for (const i of options) {
			infected[i] = true;
			total += count();
			infected[i] = false;
		}
		return total;
	};
	return count();
};

describe("2954. Count the Number of Infection Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSequence(5, [0, 4])).toBe(4);
		expect(numberOfSequence(4, [1])).toBe(3);
	});

	it("matches exploring every order on small lines", () => {
		const random = createRandom(2954);
		for (let run = 0; run < 100; run++) {
			const n = random.int(2, 8);
			const sick = [
				...new Set(random.array(random.int(1, n - 1), 0, n - 1)),
			].sort((a, b) => a - b);
			expect(numberOfSequence(n, sick)).toBe(byBruteForce(n, sick));
		}
	});
});
