/**
 * 2726. Calculator with Method Chaining
 *
 * A calculator that starts at a value and supports chained `add`,
 * `subtract`, `multiply`, `divide` and `power` calls, with `getResult` to
 * read the value. Dividing by zero throws `Error("Division by zero is not
 * allowed")`.
 *
 * Each operation updates the value and returns `this`.
 *
 * @see https://leetcode.com/problems/calculator-with-method-chaining/
 * @difficulty Easy
 * @timeComplexity O(1) per operation
 * @spaceComplexity O(1)
 *
 * @example
 * new CalculatorWithMethodChaining(10).add(5).subtract(7).getResult(); // 8
 */
export class CalculatorWithMethodChaining {
	#value: number;

	constructor(value: number) {
		this.#value = value;
	}

	add(value: number): this {
		this.#value += value;
		return this;
	}

	subtract(value: number): this {
		this.#value -= value;
		return this;
	}

	multiply(value: number): this {
		this.#value *= value;
		return this;
	}

	divide(value: number): this {
		if (value === 0) throw new Error("Division by zero is not allowed");
		this.#value /= value;
		return this;
	}

	power(value: number): this {
		this.#value **= value;
		return this;
	}

	getResult(): number {
		return this.#value;
	}
}
