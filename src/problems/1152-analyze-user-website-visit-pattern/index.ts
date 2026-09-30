/**
 * 1152. Analyze User Website Visit Pattern
 *
 * `username[i]` visited `website[i]` at `timestamp[i]`. A pattern of three
 * websites scores one for each user who visited them in that order (not
 * necessarily in a row). Returns the highest-scoring pattern, breaking ties
 * by the lexicographically smallest.
 *
 * Sorts each user's visits by time and collects the distinct patterns among
 * every choice of three of them, then counts each pattern once per user.
 *
 * @see https://leetcode.com/problems/analyze-user-website-visit-pattern/
 * @difficulty Medium
 * @timeComplexity O(n^3) for n visits
 * @spaceComplexity O(n^3)
 *
 * @example
 * analyzeUserWebsiteVisitPattern(["ua", "ua", "ua", "ub", "ub", "ub"], [1, 2, 3, 4, 5, 6], ["a", "b", "a", "a", "b", "c"]); // ["a", "b", "a"]
 */
export const analyzeUserWebsiteVisitPattern = (
	username: readonly string[],
	timestamp: readonly number[],
	website: readonly string[],
): string[] => {
	const visits = new Map<string, number[]>();
	username.forEach((user, i) => {
		const list = visits.get(user);
		if (list) list.push(i);
		else visits.set(user, [i]);
	});
	const scores = new Map<string, number>();
	for (const indices of visits.values()) {
		const sites = indices
			.sort((a, b) => (timestamp[a] ?? 0) - (timestamp[b] ?? 0))
			.map((i) => website[i] ?? "");
		const patterns = new Set<string>();
		for (let a = 0; a < sites.length; a++) {
			for (let b = a + 1; b < sites.length; b++) {
				for (let c = b + 1; c < sites.length; c++) {
					patterns.add(JSON.stringify([sites[a], sites[b], sites[c]]));
				}
			}
		}
		for (const pattern of patterns) {
			scores.set(pattern, (scores.get(pattern) ?? 0) + 1);
		}
	}
	let best: string[] = [];
	let bestScore = 0;
	for (const [key, score] of scores) {
		const pattern: string[] = JSON.parse(key);
		if (
			score > bestScore ||
			(score === bestScore && comesFirst(pattern, best))
		) {
			[best, bestScore] = [pattern, score];
		}
	}
	return best;
};

/** Whether `a` comes before `b`, comparing website by website. */
const comesFirst = (a: readonly string[], b: readonly string[]): boolean => {
	for (let i = 0; i < a.length; i++) {
		const [x = "", y = ""] = [a[i], b[i]];
		if (x !== y) return x < y;
	}
	return false;
};
