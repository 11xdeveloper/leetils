import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { replaceElementsWithGreatestElementOnRightSide as replaceElements } from ".";

describe("1299. Replace Elements with Greatest Element on Right Side", () => {
	it("solves the examples from the problem statement", () => {
		expect(replaceElements([17, 18, 5, 4, 6, 1])).toEqual([18, 6, 6, 6, 1, -1]);
		expect(replaceElements([400])).toEqual([-1]);
	});

	it("matches taking the maximum of each suffix on random inputs", () => {
		const random = createRandom(1299);
		for (let run = 0; run < 200; run++) {
			const arr = random.array(random.int(1, 15), 1, 50);
			expect(replaceElements(arr)).toEqual(
				arr.map((_, i) => Math.max(-1, ...arr.slice(i + 1))),
			);
		}
	});
});
