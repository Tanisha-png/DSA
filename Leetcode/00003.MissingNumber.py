class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        # Sum of n+1 numbers
        total = (n * (n + 1)) // 2

        # Sum of existing numbers
        currentSum = 0
        for num in nums:
            currentSum += num

        return total - currentSum



        