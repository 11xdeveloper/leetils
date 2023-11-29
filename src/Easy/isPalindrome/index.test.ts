import isPalindrome from '.';

test('isPalindrome: Tells if a provided number is a palindrome.', () => {
    expect(isPalindrome(121)).toBe(true);
    expect(isPalindrome(-121)).toBe(false);
    expect(isPalindrome(10)).toBe(false);
});
