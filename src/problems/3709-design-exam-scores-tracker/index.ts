/**
 * 3709. Design Exam Scores Tracker
 *
 * Record exam scores at increasing times and query the total score of
 * exams taken between two times, inclusive.
 *
 * Keep the times and running totals; binary search a query's bounds.
 *
 * @see https://leetcode.com/problems/design-exam-scores-tracker/
 * @difficulty Medium
 * @timeComplexity O(1) to record, O(log n) per query
 * @spaceComplexity O(n)
 *
 * @example
 * const tracker = new DesignExamScoresTracker();
 * tracker.record(1, 98);
 * tracker.totalScore(1, 1); // 98
 * tracker.record(5, 99);
 * tracker.totalScore(1, 3); // 98
 * tracker.totalScore(1, 5); // 197
 */
export class DesignExamScoresTracker {
	readonly #times: number[] = [];
	readonly #totals: number[] = [0];

	record(time: number, score: number): void {
		this.#times.push(time);
		this.#totals.push((this.#totals.at(-1) ?? 0) + score);
	}

	totalScore(startTime: number, endTime: number): number {
		return (
			(this.#totals[this.#above(endTime)] ?? 0) -
			(this.#totals[this.#above(startTime - 1)] ?? 0)
		);
	}

	/** How many recorded times are at most `time`. */
	#above(time: number): number {
		let [lo, hi] = [0, this.#times.length];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((this.#times[mid] ?? 0) <= time) lo = mid + 1;
			else hi = mid;
		}
		return lo;
	}
}
