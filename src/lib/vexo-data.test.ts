import {test} from 'node:test'
import assert from 'node:assert/strict'
import {crypto,instantPlans,challengePlans,prepareOrder} from './vexo-data'

test('BEP20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT BEP20')?.address,'0xb8FABf1CaB54D34c75ab3Fd6f0099bdE34765623')
})
test('TRC20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT TRC20')?.address,'TPGbRThBFnmXawQjHfh3MNs9pkpmytdJ3u')
})
test('other networks keep their existing wallets',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT ERC20')?.address,'0xb8FABf1CaB54D34c75ab3Fd6f0099bdE34765623')
  assert.equal(crypto.find(n=>n.id==='Ethereum')?.address,'0xb8FABf1CaB54D34c75ab3Fd6f0099bdE34765623')
  assert.equal(crypto.find(n=>n.id==='Bitcoin')?.address,'bc1qzjfw2cxax4an3hh0ck2rlpq8ks9clrvs05kwsx')
})
test('no coupon or supplied discount can reduce an order price',()=>{
  for(const plan of [...instantPlans,...challengePlans]){
    const submitted={account_type:plan.type,account_size:plan.size,broker:'Pocket Option',payment_method:'USDT TRC20',coupon:'ANYCODE',price:1}
    const order=prepareOrder(submitted)
    assert.equal(order.price,plan.price)
    assert.equal(order.coupon,null)
  }
})