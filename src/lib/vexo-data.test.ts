import {test} from 'node:test'
import assert from 'node:assert/strict'
import {crypto,instantPlans,challengePlans,prepareOrder} from './vexo-data'

test('BEP20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT BEP20')?.address,'0x36452Ad9e154120eE57dF473C873D96eAA6E0854')
})
test('TRC20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT TRC20')?.address,'TMhNFNnTkJxAKgQuz6SpdeYTrLSQCVuDZ6')
})
test('ERC20, Ethereum and Bitcoin use the approved wallets',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT ERC20')?.address,'0x36452Ad9e154120eE57dF473C873D96eAA6E0854')
  assert.equal(crypto.find(n=>n.id==='Ethereum')?.address,'0x36452Ad9e154120eE57dF473C873D96eAA6E0854')
  assert.equal(crypto.find(n=>n.id==='Bitcoin')?.address,'bc1q7y4sd6rw8umyycnd3zlps2m3fk6g0x8hmshp0q')
})
test('no coupon or supplied discount can reduce an order price',()=>{
  for(const plan of [...instantPlans,...challengePlans]){
    const submitted={account_type:plan.type,account_size:plan.size,broker:'Pocket Option',payment_method:'USDT TRC20',coupon:'ANYCODE',price:1}
    const order=prepareOrder(submitted)
    assert.equal(order.price,plan.price)
    assert.equal(order.coupon,null)
  }
})