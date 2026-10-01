import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestNumberAfterMutatingSubstring as maximumNumber } from ".";

describe("1946. Largest Number After Mutating Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumNumber("132", [9, 8, 5, 0, 3, 6, 4, 2, 6, 8])).toBe("832");
		expect(maximumNumber("021", [9, 4, 3, 5, 7, 2, 1, 9, 0, 6])).toBe("934");
		expect(maximumNumber("5", [1, 4, 7, 5, 3, 2, 5, 6, 9, 4])).toBe("5");
	});

	it("matches trying every substring on random inputs", () => {
		const random = createRandom(1946);
		for (let run = 0; run < 300; run++) {
			const num = random.string(random.int(1, 8), "0123456789");
			const change = random.array(10, 0, 9);
			let best = num;
			for (let i = 0; i < num.length; i++) {
				for (let j = i + 1; j <= num.length; j++) {
					const candidate =
						num.slice(0, i) +
						[...num.slice(i, j)].map((d) => change[Number(d)]).join("") +
						num.slice(j);
					if (candidate > best) best = candidate;
				}
			}
			expect(maximumNumber(num, change)).toBe(best);
		}
	});
});
