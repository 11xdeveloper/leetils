/**
 * 412. Fizz Buzz
 *
 * Returns the numbers from 1 to `n` as strings, with multiples of 3 replaced
 * by `"Fizz"`, multiples of 5 by `"Buzz"`, and multiples of both by
 * `"FizzBuzz"`.
 *
 * @see https://leetcode.com/problems/fizz-buzz/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the returned strings
 *
 * @example
 * fizzBuzz(5); // ["1", "2", "Fizz", "4", "Buzz"]
 */
export const fizzBuzz = (n: number): string[] =>
	Array.from({ length: n }, (_, i) => {
		const number = i + 1;
		const word =
			(number % 3 === 0 ? "Fizz" : "") + (number % 5 === 0 ? "Buzz" : "");
		return word || String(number);
	});
