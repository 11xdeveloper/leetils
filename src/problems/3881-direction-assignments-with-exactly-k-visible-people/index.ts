const MOD = 1_000_000_007;

const multiply = (a: number, b: number): number =>
	(((a * Math.floor(b / 65536)) % MOD) * 65536 + a * (b % 65536)) % MOD;

/**
 * 3881. Direction Assignments with Exactly K Visible People
 *
 * Everyone in a line faces left or right; the person at `pos` sees those
 * to their left facing left and those to their right facing right. Counts
 * the assignments where they see exactly `k` people, modulo 1e9+7.
 *
 * Each of the other n - 1 people is seen in exactly one of their two
 * directions, and the person at pos may face either way: 2 · C(n - 1, k).
 *
 * @see https://leetcode.com/problems/direction-assignments-with-exactly-k-visible-people/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * directionAssignmentsWithExactlyKVisiblePeople(3, 2, 1); // 4
 */
export const directionAssignmentsWithExactlyKVisiblePeople = (
	n: number,
	_pos: number,
	k: number,
): number => {
	const power = (base: number, exponent: number): number => {
		let result = 1;
		for (; exponent > 0; exponent = Math.floor(exponent / 2)) {
			if (exponent % 2 === 1) result = multiply(result, base);
			base = multiply(base, base);
		}
		return result;
	};
	let [top, bottom] = [1, 1];
	for (let i = 0; i < k; i++) {
		top = multiply(top, n - 1 - i);
		bottom = multiply(bottom, i + 1);
	}
	return multiply(2, multiply(top, power(bottom, MOD - 2)));
};
