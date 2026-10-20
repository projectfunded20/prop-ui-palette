import {test} from 'node:test'
import assert from 'node:assert/strict'
import {rewardProgress} from './affiliate'
test('earns one $5,000 account per three successful purchases',()=>{assert.equal(rewardProgress(3).earned,1);assert.equal(rewardProgress(6).earned,2)})
test('earns nothing below three successful purchases',()=>{assert.equal(rewardProgress(2).earned,0);assert.equal(rewardProgress(2).remaining,1)})
