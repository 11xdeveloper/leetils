/**
 * 1244. Design A Leaderboard
 *
 * Tracks players' scores: `addScore(playerId, score)` adds to a player's
 * score, `top(K)` returns the sum of the `K` highest scores, and
 * `reset(playerId)` removes a player.
 *
 * A map from player to score; `top` sorts the scores. There are at most
 * 1000 calls, so sorting beats maintaining an ordered structure.
 *
 * @see https://leetcode.com/problems/design-a-leaderboard/
 * @difficulty Medium
 * @timeComplexity O(1) per addScore and reset, O(p log p) per top for p players
 * @spaceComplexity O(p)
 *
 * @example
 * const board = new DesignALeaderboard();
 * board.addScore(1, 73);
 * board.addScore(2, 56);
 * board.top(1); // 73
 */
export class DesignALeaderboard {
	readonly #scores = new Map<number, number>();

	addScore(playerId: number, score: number): void {
		this.#scores.set(playerId, (this.#scores.get(playerId) ?? 0) + score);
	}

	top(K: number): number {
		return [...this.#scores.values()]
			.sort((a, b) => b - a)
			.slice(0, K)
			.reduce((sum, score) => sum + score, 0);
	}

	reset(playerId: number): void {
		this.#scores.delete(playerId);
	}
}
