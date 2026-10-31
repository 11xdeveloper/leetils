import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countBeautifulSplitsInAnArray as beautifulSplits } from ".";

const startsWith = (whole: number[], part: number[]) =>
	part.length <= whole.length && part.every((v, i) => whole[i] === v);

describe("3388. Count Beautiful Splits in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautifulSplits([1, 1, 2, 1])).toBe(2);
		expect(beautifulSplits([1, 2, 3, 4])).toBe(0);
	});

	it("matches checking every split on random arrays", () => {
		const random = createRandom(3388);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 2);
			let count = 0;
			for (let i = 1; i < nums.length - 1; i++)
				for (let j = i + 1; j < nums.length; j++) {
					const [a, b, c] = [nums.slice(0, i), nums.slice(i, j), nums.slice(j)];
					if (startsWith(b, a) || startsWith(c, b)) count++;
				}
			expect(beautifulSplits(nums)).toBe(count);
		}
	});
});
