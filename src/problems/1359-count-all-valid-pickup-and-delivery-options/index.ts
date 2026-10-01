/**
 * 1359. Count All Valid Pickup and Delivery Options
 *
 * Counts the orderings of `n` pickups and `n` deliveries in which each
 * delivery comes after its pickup, modulo 10^9 + 7.
 *
 * Adding the `k`th order to a valid sequence of `2(k − 1)` events: there
 * are `C(2k, 2) = k(2k − 1)` ways to place its pickup and delivery in the
 * right order. So the answer is the product of those.
 *
 * @see https://leetcode.com/problems/count-all-valid-pickup-and-delivery-options/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countAllValidPickupAndDeliveryOptions(3); // 90
 */
export const countAllValidPickupAndDeliveryOptions = (n: number): number => {
	const MOD = 1_000_000_007;
	let count = 1;
	for (let k = 2; k <= n; k++)
		count = (count * ((k * (2 * k - 1)) % MOD)) % MOD;
	return count;
};
