import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { constructTargetArrayWithMultipleSums as isPossible } from ".";

/** Every array reachable from all 1s whose values stay within `limit`. */
const reachable = (n: number, limit: number): Set<string> => {
	const start = new Array<number>(n).fill(1);
	const seen = new Set([start.join(",")]);
	const stack = [start];
	for (let arr = stack.pop(); arr; arr = stack.pop()) {
		const sum = arr.reduce((s, x) => s + x, 0);
		if (sum > limit) continue;
		for (let i = 0; i < n; i++) {
			const next = arr.with(i, sum);
			const key = next.join(",");
			if (seen.has(key)) continue;
			seen.add(key);
			stack.push(next);
		}
	}
	return seen;
};

describe("1354. Construct Target Array With Multiple Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(isPossible([9, 3, 5])).toBeTrue();
		expect(isPossible([1, 1, 1, 2])).toBeFalse();
		expect(isPossible([8, 5])).toBeTrue();
	});

	it("handles huge lopsided targets", () => {
		expect(isPossible([1, 10 ** 9])).toBeTrue();
		expect(isPossible([2, 10 ** 9])).toBeFalse();
		expect(isPossible([1])).toBeTrue();
		expect(isPossible([2])).toBeFalse();
	});

	it("matches exploring forwards from all 1s", () => {
		const random = createRandom(1354);
		for (const n of [2, 3]) {
			const seen = reachable(n, 30);
			for (let run = 0; run < 300; run++) {
				const target = random.array(n, 1, 30);
				expect(isPossible(target)).toBe(seen.has(target.join(",")));
			}
		}
	});
});
