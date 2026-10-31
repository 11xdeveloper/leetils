/**
 * 2241. Design an ATM Machine
 *
 * An ATM holds $20, $50, $100, $200 and $500 notes. Withdrawals always
 * take as many of the largest notes as possible first; if that can't make
 * the exact amount, nothing is withdrawn and `[-1]` is returned.
 *
 * Simulate the greedy withdrawal, committing only if it succeeds.
 *
 * @see https://leetcode.com/problems/design-an-atm-machine/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(1)
 *
 * @example
 * const atm = new DesignAnAtmMachine();
 * atm.deposit([0, 0, 1, 2, 1]);
 * atm.withdraw(600); // [0, 0, 1, 0, 1]
 */
export class DesignAnAtmMachine {
	static readonly #values = [20, 50, 100, 200, 500];
	readonly #notes = [0, 0, 0, 0, 0];

	deposit(banknotesCount: readonly number[]): void {
		for (const [i, count] of banknotesCount.entries())
			this.#notes[i] = (this.#notes[i] ?? 0) + count;
	}

	withdraw(amount: number): number[] {
		const taken = [0, 0, 0, 0, 0];
		for (let i = 4; i >= 0; i--) {
			const value = DesignAnAtmMachine.#values[i] ?? 1;
			taken[i] = Math.min(this.#notes[i] ?? 0, Math.floor(amount / value));
			amount -= (taken[i] ?? 0) * value;
		}
		if (amount !== 0) return [-1];
		for (const [i, count] of taken.entries())
			this.#notes[i] = (this.#notes[i] ?? 0) - count;
		return taken;
	}
}
