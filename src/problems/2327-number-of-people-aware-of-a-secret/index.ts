/**
 * 2327. Number of People Aware of a Secret
 *
 * One person learns a secret on day 1. Everyone shares it with a new
 * person each day from `delay` days after learning it until they forget it
 * `forget` days after learning it. Returns how many know it at the end of
 * day `n`, modulo 10^9 + 7.
 *
 * Track how many people learn it each day; those sharing on a day learned
 * it between `forget - 1` and `delay` days earlier.
 *
 * @see https://leetcode.com/problems/number-of-people-aware-of-a-secret/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfPeopleAwareOfASecret(6, 2, 4); // 5
 */
export const numberOfPeopleAwareOfASecret = (
	n: number,
	delay: number,
	forget: number,
): number => {
	const MOD = 1_000_000_007;
	const learned = new Array<number>(n + 1).fill(0);
	learned[1] = 1;
	let sharing = 0;
	for (let day = 2; day <= n; day++) {
		sharing =
			(sharing +
				(learned[day - delay] ?? 0) -
				(learned[day - forget] ?? 0) +
				MOD) %
			MOD;
		learned[day] = sharing;
	}
	let aware = 0;
	for (let day = n - forget + 1; day <= n; day++)
		aware = (aware + (learned[day] ?? 0)) % MOD;
	return aware;
};
