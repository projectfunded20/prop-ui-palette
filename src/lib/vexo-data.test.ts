import {test} from 'node:test'
import assert from 'node:assert/strict'
import {crypto,instantPlans,challengePlans,prepareOrder} from './vexo-data'

test('BEP20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT BEP20')?.address,'0x27037cdf68F1731d8953CDa2555827250C376174')
})
test('TRC20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT TRC20')?.address,'TFXCoDs729RzgkZe7sebDFYJLgVy4EzUPr')
})
test('ERC20, Ethereum and Bitcoin use the approved wallets',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT ERC20')?.address,'0x27037cdf68F1731d8953CDa2555827250C376174')
  assert.equal(crypto.find(n=>n.id==='Ethereum')?.address,'0x27037cdf68F1731d8953CDa2555827250C376174')
  assert.equal(crypto.find(n=>n.id==='Bitcoin')?.address,'bc1qv5tl0fmyac9j33s9ajnj0uqvdkuptcnvg6r8fa')
})
test('no coupon or supplied discount can reduce an order price',()=>{
  for(const plan of [...instantPlans,...challengePlans]){
    const submitted={account_type:plan.type,account_size:plan.size,broker:'Pocket Option',payment_method:'USDT TRC20',coupon:'ANYCODE',price:1}
    const order=prepareOrder(submitted)
    assert.equal(order.price,plan.price)
    assert.equal(order.coupon,null)
  }
})