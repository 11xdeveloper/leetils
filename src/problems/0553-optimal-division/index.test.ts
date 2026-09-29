import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { optimalDivision } from ".";

/** The largest and smallest values of nums[i..j] over every parenthesisation. */
const extremes = (nums: number[]): number => {
	const range = (i: number, j: number): [max: number, min: number] => {
		if (i === j) return [nums[i] ?? 0, nums[i] ?? 0];
		let max = Number.NEGATIVE_INFINITY;
		let min = Number.POSITIVE_INFINITY;
		for (let k = i; k < j; k++) {
			const [leftMax, leftMin] = range(i, k);
			const [rightMax, rightMin] = range(k + 1, j);
			max = Math.max(max, leftMax / rightMin);
			min = Math.min(min, leftMin / rightMax);
		}
		return [max, min];
	};
	return range(0, nums.length - 1)[0];
};

/** Evaluates an expression of numbers, "/" and parentheses. */
const evaluate = (expression: string): number => {
	let i = 0;
	const term = (): number => {
		if (expression.charAt(i) === "(") {
			i++;
			const value = division();
			i++;
			return value;
		}
		const start = i;
		while (/\d/.test(expression.charAt(i))) i++;
		return Number(expression.slice(start, i));
	};
	const division = (): number => {
		let value = term();
		while (expression.charAt(i) === "/") {
			i++;
			value /= term();
		}
		return value;
	};
	return division();
};

describe("553. Optimal Division", () => {
	it("solves the examples from the problem statement", () => {
		expect(optimalDivision([1000, 100, 10, 2])).toBe("1000/(100/10/2)");
		expect(optimalDivision([2, 3, 4])).toBe("2/(3/4)");
		expect(optimalDivision([2])).toBe("2");
		expect(optimalDivision([2, 3])).toBe("2/3");
	});

	it("reaches the largest value of any parenthesisation on random inputs", () => {
		const random = createRandom(553);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 7), 2, 1000);
			expect(evaluate(optimalDivision(nums))).toBeCloseTo(extremes(nums), 9);
		}
	});
});
