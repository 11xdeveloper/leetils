/**
 * You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer.
 * The digits are ordered from most significant to least significant in left-to-right order.
 * The large integer does not contain any leading 0's.
 * Increment the large integer by one and return the resulting array of digits.
 * 
 * @param digits - Array representing a large integer
 * @returns Array representing the large integer plus one
 * 
 * @example
 * Input: digits = [1,2,3]
 * Output: [1,2,4]
 * Explanation: The array represents the integer 123, incrementing by one gives 124
 * 
 * @example
 * Input: digits = [4,3,2,1]
 * Output: [4,3,2,2]
 * Explanation: The array represents the integer 4321, incrementing by one gives 4322
 * 
 * @example
 * Input: digits = [9]
 * Output: [1,0]
 * Explanation: The array represents the integer 9, incrementing by one gives 10
 * 
 * @timeComplexity O(n) - where n is the number of digits
 * @spaceComplexity O(n) - to store the result array
 */
export const plusOne = (digits: number[]): number[] =>
	Array.from((BigInt(digits.join("")) + BigInt(1)).toString(), Number);
