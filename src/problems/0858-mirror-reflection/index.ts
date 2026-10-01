/**
 * 858. Mirror Reflection
 *
 * A laser leaves the south-west corner of a square mirrored room of side
 * `p` and first hits the east wall `q` above the floor. Receptors 0, 1 and
 * 2 sit in the south-east, north-east and north-west corners. Returns the
 * receptor the ray reaches first.
 *
 * Unfolding the reflections, the ray travels straight until it has climbed
 * a multiple of `p` after crossing a whole number of room widths. Dividing
 * out the common factors of two, which receptor it meets depends only on
 * whether `p` and `q` are then odd or even.
 *
 * @see https://leetcode.com/problems/mirror-reflection/
 * @difficulty Medium
 * @timeComplexity O(log p)
 * @spaceComplexity O(1)
 *
 * @example
 * mirrorReflection(2, 1); // 2
 */
export const mirrorReflection = (p: number, q: number): number => {
	while (p % 2 === 0 && q % 2 === 0) {
		p /= 2;
		q /= 2;
	}
	return 1 - (p % 2) + (q % 2);
};
