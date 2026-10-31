/**
 * 3921. Score Validator
 *
 * Process cricket-style `events`: runs add to the score, "WD" and "NB"
 * add 1, and "W" counts a wicket, stopping once there are 10. Returns
 * [score, wickets].
 *
 * @see https://leetcode.com/problems/score-validator/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * scoreValidator(["1", "4", "W", "6", "WD"]); // [12, 1]
 */
export const scoreValidator = (events: readonly string[]): number[] => {
	let [score, wickets] = [0, 0];
	for (const event of events) {
		if (wickets === 10) break;
		if (event === "W") wickets++;
		else if (event === "WD" || event === "NB") score++;
		else score += Number(event);
	}
	return [score, wickets];
};
