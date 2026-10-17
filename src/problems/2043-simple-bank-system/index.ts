/**
 * 2043. Simple Bank System
 *
 * Processes transfers, deposits and withdrawals on accounts numbered from
 * 1, rejecting any with an invalid account or too little money.
 *
 * Validate, then update the balances.
 *
 * @see https://leetcode.com/problems/simple-bank-system/
 * @difficulty Medium
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(n)
 *
 * @example
 * const bank = new SimpleBankSystem([10, 100, 20, 50, 30]);
 * bank.withdraw(3, 10); // true
 * bank.transfer(5, 1, 20); // true
 */
export class SimpleBankSystem {
	readonly #balances: number[];

	constructor(balance: readonly number[]) {
		this.#balances = [...balance];
	}

	transfer(account1: number, account2: number, money: number): boolean {
		if (!this.#exists(account2) || !this.withdraw(account1, money))
			return false;
		return this.deposit(account2, money);
	}

	deposit(account: number, money: number): boolean {
		if (!this.#exists(account)) return false;
		this.#balances[account - 1] = (this.#balances[account - 1] ?? 0) + money;
		return true;
	}

	withdraw(account: number, money: number): boolean {
		const balance = this.#balances[account - 1];
		if (!this.#exists(account) || balance === undefined || balance < money)
			return false;
		this.#balances[account - 1] = balance - money;
		return true;
	}

	#exists(account: number): boolean {
		return account >= 1 && account <= this.#balances.length;
	}
}
