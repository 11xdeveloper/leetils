import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { friendsOfAppropriateAges as numFriendRequests } from ".";

describe("825. Friends Of Appropriate Ages", () => {
	it("solves the examples from the problem statement", () => {
		expect(numFriendRequests([16, 16])).toBe(2);
		expect(numFriendRequests([16, 17, 18])).toBe(2);
		expect(numFriendRequests([20, 30, 100, 110, 120])).toBe(3);
	});

	it("matches checking every pair of people on random inputs", () => {
		const random = createRandom(825);
		for (let run = 0; run < 500; run++) {
			const ages = random.array(random.int(1, 20), 1, 120);
			let expected = 0;
			for (const [i, x] of ages.entries()) {
				for (const [j, y] of ages.entries())
					if (i !== j && !(y <= 0.5 * x + 7 || y > x || (y > 100 && x < 100)))
						expected++;
			}
			expect(numFriendRequests(ages)).toBe(expected);
		}
	});
});
