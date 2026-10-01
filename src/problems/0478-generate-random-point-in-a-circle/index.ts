/**
 * 478. Generate Random Point in a Circle
 *
 * Built from a circle's radius and centre, `randPoint` returns a uniformly
 * random point inside it (points on the circumference count as inside).
 *
 * Picks a random angle, and a distance from the centre of `radius · √u` for
 * a uniform `u`. The square root is needed because the area within distance
 * `d` grows with `d²`; without it points would bunch near the centre.
 * `random` is the source of randomness, `Math.random` by default.
 *
 * @see https://leetcode.com/problems/generate-random-point-in-a-circle/
 * @difficulty Medium
 * @timeComplexity O(1) per point
 * @spaceComplexity O(1)
 *
 * @example
 * const circle = new GenerateRandomPointInACircle(1, 0, 0);
 * circle.randPoint(); // e.g. [-0.02493, -0.38077]
 */
export class GenerateRandomPointInACircle {
	readonly #radius: number;
	readonly #xCenter: number;
	readonly #yCenter: number;
	readonly #random: () => number;

	constructor(
		radius: number,
		xCenter: number,
		yCenter: number,
		random: () => number = Math.random,
	) {
		this.#radius = radius;
		this.#xCenter = xCenter;
		this.#yCenter = yCenter;
		this.#random = random;
	}

	randPoint(): number[] {
		const distance = this.#radius * Math.sqrt(this.#random());
		const angle = 2 * Math.PI * this.#random();
		return [
			this.#xCenter + distance * Math.cos(angle),
			this.#yCenter + distance * Math.sin(angle),
		];
	}
}
