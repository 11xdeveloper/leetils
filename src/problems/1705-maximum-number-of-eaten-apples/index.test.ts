import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfEatenApples as eatenApples } from ".";

/** Tries eating or skipping each apple available, with memoised search over small inputs. */
const byBruteForce = (apples: number[], days: number[]): number => {
	const lastDay = Math.max(...apples.map((_, i) => i + (days[i] ?? 0)));
	const memo = new Map<string, number>();
	const best = (day: number, left: number[]): number => {
		if (day > lastDay) return 0;
		const key = `${day}:${left.join(",")}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		let result = best(day + 1, left);
		for (let i = 0; i <= Math.min(day, apples.length - 1); i++) {
			if ((left[i] ?? 0) === 0 || i + (days[i] ?? 0) <= day) continue;
			const next = [...left];
			next[i] = (next[i] ?? 0) - 1;
			result = Math.max(result, 1 + best(day + 1, next));
		}
		memo.set(key, result);
		return result;
	};
	return best(0, [...apples]);
};

describe("1705. Maximum Number of Eaten Apples", () => {
	it("solves the examples from the problem statement", () => {
		expect(eatenApples([1, 2, 3, 5, 2], [3, 2, 1, 4, 2])).toBe(7);
		expect(eatenApples([3, 0, 0, 0, 0, 2], [3, 0, 0, 0, 0, 2])).toBe(5);
	});

	it("matches searching every eating plan on random inputs", () => {
		const random = createRandom(1705);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 4);
			const apples = random.array(n, 0, 3);
			const days = apples.map((count) => (count === 0 ? 0 : random.int(1, 4)));
			expect(eatenApples(apples, days)).toBe(byBruteForce(apples, days));
		}
	});
});
