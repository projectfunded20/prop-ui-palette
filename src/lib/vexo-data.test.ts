import {test} from 'node:test'
import assert from 'node:assert/strict'
import {crypto,instantPlans,challengePlans,prepareOrder} from './vexo-data'

test('BEP20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT BEP20')?.address,'0xa8073047789Ff3cdb6F41926153eB775f83d2609')
})
test('TRC20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT TRC20')?.address,'TQMEndNpmtZAfcF7DfaHx9UkSysBQZDAxd')
})
test('other networks keep their existing wallets',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT ERC20')?.address,'0xAf47A04AFccE6F741CA3d74BFba5C5a817F4Cab9')
  assert.equal(crypto.find(n=>n.id==='Ethereum')?.address,'0xAf47A04AFccE6F741CA3d74BFba5C5a817F4Cab9')
  assert.equal(crypto.find(n=>n.id==='Bitcoin')?.address,'bc1qhxswu8ez5qn0wlfhxsxwrgwsrku0s8a7xxd4mj')
})
test('no coupon or supplied discount can reduce an order price',()=>{
  for(const plan of [...instantPlans,...challengePlans]){
    const submitted={account_type:plan.type,account_size:plan.size,broker:'Pocket Option',payment_method:'USDT TRC20',coupon:'ANYCODE',price:1}
    const order=prepareOrder(submitted)
    assert.equal(order.price,plan.price)
    assert.equal(order.coupon,null)
  }
})