/**
 * 2024. Maximize the Confusion of an Exam
 *
 * Returns the longest run of equal answers in `answerKey` ("T"s and "F"s)
 * after changing at most `k` answers.
 *
 * Slide a window that holds at most `k` of the less common answer: grow
 * it, and shrink it from the left once both answers appear more than `k`
 * times.
 *
 * @see https://leetcode.com/problems/maximize-the-confusion-of-an-exam/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximizeTheConfusionOfAnExam("TTFF", 2); // 4
 */
export const maximizeTheConfusionOfAnExam = (
	answerKey: string,
	k: number,
): number => {
	let [trues, falses, start, best] = [0, 0, 0, 0];
	for (const [end, answer] of [...answerKey].entries()) {
		if (answer === "T") trues++;
		else falses++;
		while (Math.min(trues, falses) > k) {
			if (answerKey[start++] === "T") trues--;
			else falses--;
		}
		best = Math.max(best, end - start + 1);
	}
	return best;
};
