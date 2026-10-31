import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumJumpsToReachEndViaPrimeTeleportation as minJumps } from ".";

const isPrime = (x: number) => {
	if (x < 2) return false;
	for (let d = 2; d * d <= x; d++) if (x % d === 0) return false;
	return true;
};

/** Breadth-first search trying every jump from every index. */
const byBruteForce = (nums: number[]): number => {
	const n = nums.length;
	const distance = new Array<number>(n).fill(-1);
	distance[0] = 0;
	const queue = [0];
	for (let q = 0; q < queue.length; q++) {
		const i = queue[q] ?? 0;
		const value = nums[i] ?? 0;
		for (let j = 0; j < n; j++)
			if (
				distance[j] === -1 &&
				(Math.abs(i - j) === 1 ||
					(isPrime(value) && (nums[j] ?? 0) % value === 0))
			) {
				distance[j] = (distance[i] ?? 0) + 1;
				queue.push(j);
			}
	}
	return distance[n - 1] ?? 0;
};

describe("3629. Minimum Jumps to Reach End via Prime Teleportation", () => {
	it("solves the examples from the problem statement", () => {
		expect(minJumps([1, 2, 4, 6])).toBe(2);
		expect(minJumps([2, 3, 4, 7, 9])).toBe(2);
		expect(minJumps([4, 6, 5, 8])).toBe(3);
	});

	it("matches trying every jump on random arrays", () => {
		const random = createRandom(3629);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 30);
			expect(minJumps(nums)).toBe(byBruteForce(nums));
		}
	});
});
