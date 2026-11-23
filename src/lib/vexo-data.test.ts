import {test} from 'node:test'
import assert from 'node:assert/strict'
import {crypto,instantPlans,challengePlans,prepareOrder} from './vexo-data'

test('BEP20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT BEP20')?.address,'0x17bD97B2e6E91F2e01123c61Da4E905B9A0A3f91')
})
test('TRC20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT TRC20')?.address,'TZHcnHMo6MkM6rMrBEAZ59e3nmCTTaCBS7')
})
test('ERC20, Ethereum and Bitcoin use the approved wallets',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT ERC20')?.address,'0x17bD97B2e6E91F2e01123c61Da4E905B9A0A3f91')
  assert.equal(crypto.find(n=>n.id==='Ethereum')?.address,'0x17bD97B2e6E91F2e01123c61Da4E905B9A0A3f91')
  assert.equal(crypto.find(n=>n.id==='Bitcoin')?.address,'bc1qplnk9gjnl6cc9fatt5ca2e6w2dafhmc9yzq8l0')
})
test('no coupon or supplied discount can reduce an order price',()=>{
  for(const plan of [...instantPlans,...challengePlans]){
    const submitted={account_type:plan.type,account_size:plan.size,broker:'Pocket Option',payment_method:'USDT TRC20',coupon:'ANYCODE',price:1}
    const order=prepareOrder(submitted)
    assert.equal(order.price,plan.price)
    assert.equal(order.coupon,null)
  }
})