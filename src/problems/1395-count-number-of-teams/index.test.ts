import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNumberOfTeams as numTeams } from ".";

/** Checks every triple. */
const byBruteForce = (rating: number[]): number => {
	let teams = 0;
	for (let i = 0; i < rating.length; i++) {
		for (let j = i + 1; j < rating.length; j++) {
			for (let k = j + 1; k < rating.length; k++) {
				const [a = 0, b = 0, c = 0] = [rating[i], rating[j], rating[k]];
				if ((a < b && b < c) || (a > b && b > c)) teams++;
			}
		}
	}
	return teams;
};

describe("1395. Count Number of Teams", () => {
	it("solves the examples from the problem statement", () => {
		expect(numTeams([2, 5, 3, 4, 1])).toBe(3);
		expect(numTeams([2, 1, 3])).toBe(0);
		expect(numTeams([1, 2, 3, 4])).toBe(4);
	});

	it("matches checking every triple on random inputs", () => {
		const random = createRandom(1395);
		for (let run = 0; run < 300; run++) {
			const rating = [...new Set(random.array(random.int(3, 12), 1, 50))];
			expect(numTeams(rating)).toBe(byBruteForce(rating));
		}
	});
});
