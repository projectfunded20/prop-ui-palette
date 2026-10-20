import {test} from 'node:test'
import assert from 'node:assert/strict'
import {rewardProgress} from './affiliate'
import {affiliateLink} from './site'
test('referral link uses the vexofunded.com domain, never the hosting address',()=>{assert.equal(affiliateLink('ab12cd'),'https://www.vexofunded.com/signup?ref=AB12CD');assert.doesNotMatch(affiliateLink('ab12cd'),/lovable/i)})
test('referral link is empty without a code',()=>{assert.equal(affiliateLink(''),'')})
test('earns one $5,000 account per three successful purchases',()=>{assert.equal(rewardProgress(3).earned,1);assert.equal(rewardProgress(6).earned,2)})
test('earns nothing below three successful purchases',()=>{assert.equal(rewardProgress(2).earned,0);assert.equal(rewardProgress(2).remaining,1)})
