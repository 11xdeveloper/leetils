/**
 * 3638. Maximum Balanced Shipments
 *
 * Split parcels into non-overlapping consecutive shipments, not
 * necessarily using every parcel; a shipment is balanced if its last
 * parcel weighs strictly less than its heaviest. Returns the most balanced
 * shipments.
 *
 * Greedily close a shipment as soon as a parcel is lighter than the
 * heaviest since the last one closed.
 *
 * @see https://leetcode.com/problems/maximum-balanced-shipments/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumBalancedShipments([2, 5, 1, 4, 3]); // 2
 */
export const maximumBalancedShipments = (weight: readonly number[]): number => {
	let count = 0;
	let heaviest = 0;
	for (const w of weight) {
		if (w < heaviest) {
			count++;
			heaviest = 0;
		} else heaviest = w;
	}
	return count;
};
