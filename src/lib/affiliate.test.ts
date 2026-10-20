import {describe,expect,it} from 'vitest'
import {rewardProgress} from './affiliate'
describe('affiliate reward',()=>{
  it('earns one account per three successful purchases',()=>{expect(rewardProgress(3).earned).toBe(1);expect(rewardProgress(6).earned).toBe(2)})
  it('earns nothing below three',()=>{expect(rewardProgress(2).earned).toBe(0);expect(rewardProgress(2).remaining).toBe(1)})
})
