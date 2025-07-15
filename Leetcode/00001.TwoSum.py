class Solution:
    # def twoSum(self, nums: List[int], target: int) -> List[int]:
    #     for i in range(len(nums)):
    #         for j in range(i+1,len(nums)):
    #             if nums[i] + nums[j]==target:
    #                 return [i,j]
    #     return []
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        number_map ={}

        for i , num in enumerate(nums):
            diff = target - num 
            if diff in number_map:
                return [i, number_map[diff]]
            
            number_map[num] =i
        return []