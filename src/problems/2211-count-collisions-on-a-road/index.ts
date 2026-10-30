/**
 * 2211. Count Collisions on a Road
 *
 * Cars move left ("L"), right ("R") or stand still ("S"); colliding cars
 * stop where they meet. Counts the collisions, where a head-on collision
 * counts 2 and hitting a stopped car counts 1.
 *
 * Cars driving off either end escape; every other moving car eventually
 * stops, adding one each.
 *
 * @see https://leetcode.com/problems/count-collisions-on-a-road/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countCollisionsOnARoad("RLRSLL"); // 5
 */
export const countCollisionsOnARoad = (directions: string): number => {
	const trapped = directions.replace(/^L+/, "").replace(/R+$/, "");
	return [...trapped].filter((direction) => direction !== "S").length;
};
