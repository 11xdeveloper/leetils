import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfInversions as numberOfPermutations } from ".";

/** Checks every permutation. */
const byBruteForce = (n: number, requirements: number[][]): number => {
	let count = 0;
	const permute = (prefix: number[], used: number): void => {
		if (prefix.length === n) {
			const ok = requirements.every(([end = 0, cnt = 0]) => {
				let inversions = 0;
				for (let i = 0; i <= end; i++)
					for (let j = i + 1; j <= end; j++)
						if ((prefix[i] ?? 0) > (prefix[j] ?? 0)) inversions++;
				return inversions === cnt;
			});
			if (ok) count++;
			return;
		}
		for (let v = 0; v < n; v++)
			if (!((used >> v) & 1)) permute([...prefix, v], used | (1 << v));
	};
	permute([], 0);
	return count;
};

describe("3193. Count the Number of Inversions", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfPermutations(3, [
				[2, 2],
				[0, 0],
			]),
		).toBe(2);
		expect(
			numberOfPermutations(3, [
				[2, 2],
				[1, 1],
				[0, 0],
			]),
		).toBe(1);
		expect(
			numberOfPermutations(2, [
				[0, 0],
				[1, 0],
			]),
		).toBe(1);
	});

	it("matches checking every permutation on random requirements", () => {
		const random = createRandom(3193);
		for (let run = 0; run < 200; run++) {
			const n = random.int(2, 6);
			const ends = new Set([n - 1]);
			for (let i = random.int(0, 2); i > 0; i--) ends.add(random.int(0, n - 1));
			const requirements = [...ends].map((end) => [
				end,
				random.int(0, (end * (end + 1)) / 2),
			]);
			expect(numberOfPermutations(n, requirements)).toBe(
				byBruteForce(n, requirements),
			);
		}
	});
});
