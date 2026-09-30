import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { chalkboardXorGame as xorGame } from ".";

/** Plays the game out: the player to move wins if the XOR is 0, or some erasure doesn't lose. */
const byGameTree = (nums: number[]): boolean => {
	if (nums.reduce((xor, num) => xor ^ num, 0) === 0) return true;
	return nums.some((_, i) => {
		const rest = nums.filter((__, j) => j !== i);
		if (rest.reduce((xor, num) => xor ^ num, 0) === 0) return false;
		return !byGameTree(rest);
	});
};

describe("810. Chalkboard XOR Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(xorGame([1, 1, 2])).toBeFalse();
		expect(xorGame([0, 1])).toBeTrue();
		expect(xorGame([1, 2, 3])).toBeTrue();
	});

	it("matches playing out the game on random inputs", () => {
		const random = createRandom(810);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(1, 7), 0, 7);
			expect(xorGame(nums)).toBe(byGameTree(nums));
		}
	});
});
