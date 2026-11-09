import {test} from 'node:test'
import assert from 'node:assert/strict'
import {crypto,instantPlans,challengePlans,prepareOrder} from './vexo-data'

test('BEP20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT BEP20')?.address,'0x152adf04aCFA567138623eB6c15b8600B175757D')
})
test('TRC20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT TRC20')?.address,'TVKMct7hJ46HqzmmqgFspCaXoGSNCpLTio')
})
test('other networks keep their existing wallets',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT ERC20')?.address,'0x152adf04aCFA567138623eB6c15b8600B175757D')
  assert.equal(crypto.find(n=>n.id==='Ethereum')?.address,'0x152adf04aCFA567138623eB6c15b8600B175757D')
  assert.equal(crypto.find(n=>n.id==='Bitcoin')?.address,'bc1qv6tgssslvcmelv09jac590eq9w5lzxtus6d2yw')
})
test('no coupon or supplied discount can reduce an order price',()=>{
  for(const plan of [...instantPlans,...challengePlans]){
    const submitted={account_type:plan.type,account_size:plan.size,broker:'Pocket Option',payment_method:'USDT TRC20',coupon:'ANYCODE',price:1}
    const order=prepareOrder(submitted)
    assert.equal(order.price,plan.price)
    assert.equal(order.coupon,null)
  }
})