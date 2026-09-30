/**
 * 1125. Smallest Sufficient Team
 *
 * Returns the indices of a smallest group of `people` who between them have
 * every skill in `req_skills` (at most 16). One is guaranteed to exist.
 *
 * Dynamic programming over sets of skills, as bitmasks: `size[mask]` is the
 * smallest team covering `mask`, reached from some smaller team by adding
 * one person. Each set remembers the set and person it came from, so the
 * team can be read back.
 *
 * @see https://leetcode.com/problems/smallest-sufficient-team/
 * @difficulty Hard
 * @timeComplexity O(2^s · p) for s skills and p people
 * @spaceComplexity O(2^s)
 *
 * @example
 * smallestSufficientTeam(["java", "nodejs", "reactjs"], [["java"], ["nodejs"], ["nodejs", "reactjs"]]); // [0, 2]
 */
export const smallestSufficientTeam = (
	req_skills: readonly string[],
	people: readonly (readonly string[])[],
): number[] => {
	const bit = new Map(req_skills.map((skill, i) => [skill, 1 << i]));
	const masks = people.map((skills) =>
		skills.reduce((mask, skill) => mask | (bit.get(skill) ?? 0), 0),
	);
	const full = (1 << req_skills.length) - 1;
	const size = new Array<number>(full + 1).fill(Infinity);
	const previous = new Int32Array(full + 1);
	const person = new Int32Array(full + 1);
	size[0] = 0;
	for (let mask = 0; mask <= full; mask++) {
		const next = (size[mask] ?? Infinity) + 1;
		if (next === Infinity) continue;
		masks.forEach((skills, i) => {
			const combined = mask | skills;
			if (next >= (size[combined] ?? 0)) return;
			size[combined] = next;
			previous[combined] = mask;
			person[combined] = i;
		});
	}
	const team: number[] = [];
	for (let mask = full; mask !== 0; mask = previous[mask] ?? 0) {
		team.push(person[mask] ?? 0);
	}
	return team.reverse();
};
