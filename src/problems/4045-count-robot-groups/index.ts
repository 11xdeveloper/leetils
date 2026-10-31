/**
 * 4045. Count Robot Groups
 *
 * Robots move right at their speeds; groups within `distance` of each
 * other merge, taking the position and speed of their rightmost robot.
 * Returns the number of groups left at the end.
 *
 * A group is just its leader's point, and robots never affect those ahead,
 * so sweep from the right. The group ahead of robot i traces a piecewise
 * path: a robot's own line until it merges, then whatever it merged into.
 * Keep that path as a stack of pieces from the earliest; robot i merges at
 * the first time it gets within distance of it (a line crossing, compared
 * exactly in BigInt), which discards the pieces before.
 *
 * @see https://leetcode.com/problems/count-robot-groups/
 * @difficulty Medium
 * @timeComplexity O(n) amortised
 * @spaceComplexity O(n)
 *
 * @example
 * countRobotGroups([1, 5, 6, 20], [4, 3, 2, 3], 1); // 2
 */
export const countRobotGroups = (
	position: readonly number[],
	speed: readonly number[],
	distance: number,
): number => {
	type Time = [numerator: bigint, denominator: bigint];
	/** A piece of the path ahead: it follows `start + rate · t` from `from` onwards. */
	type Piece = { from: Time; start: bigint; rate: bigint };
	const before = (a: Time, b: Time) => a[0] * b[1] < b[0] * a[1];
	const d = BigInt(distance);
	// pieces.at(-1) is the earliest piece; each piece lasts until the one below starts.
	let pieces: Piece[] = [];
	let groups = 0;
	for (let i = position.length - 1; i >= 0; i--) {
		const [p, s] = [BigInt(position[i] ?? 0), BigInt(speed[i] ?? 0)];
		let meet: Time | undefined;
		while (pieces.length > 0) {
			const piece = pieces.at(-1) as Piece;
			const until = pieces.at(-2)?.from;
			const [a, b] = piece.from;
			// Gap at the piece's start: (start - p - d) + (rate - s)·t ≤ 0?
			if ((piece.start - p - d) * b + (piece.rate - s) * a <= 0n)
				meet = piece.from;
			else if (piece.rate < s) {
				const crossing: Time = [piece.start - p - d, s - piece.rate];
				if (!until || before(crossing, until)) meet = crossing;
			}
			if (meet) break;
			pieces.pop();
		}
		if (meet) {
			// Until it merges, robot i itself leads the path for those behind.
			const piece = pieces.at(-1) as Piece;
			pieces[pieces.length - 1] = { ...piece, from: meet };
		} else {
			groups++;
			pieces = [];
		}
		pieces.push({ from: [0n, 1n], start: p, rate: s });
	}
	return groups;
};
