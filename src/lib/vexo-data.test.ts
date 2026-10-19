import {test} from 'node:test'
import assert from 'node:assert/strict'
import {crypto,instantPlans,challengePlans,prepareOrder} from './vexo-data'

test('BEP20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT BEP20')?.address,'0x9A9005E630789461c6380F7734b0F18C1A312333')
})
test('TRC20 uses the approved wallet',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT TRC20')?.address,'TBpAATb5kevrTe88vkNzD4AYnhm4pSc3FB')
})
test('other networks keep their existing wallets',()=>{
  assert.equal(crypto.find(n=>n.id==='USDT ERC20')?.address,'0x9A9005E630789461c6380F7734b0F18C1A312333')
  assert.equal(crypto.find(n=>n.id==='Ethereum')?.address,'0x9A9005E630789461c6380F7734b0F18C1A312333')
  assert.equal(crypto.find(n=>n.id==='Bitcoin')?.address,'bc1qfdlygc357p5lvfhhfp4fnkd2zehz535t3r7pzg')
})
test('no coupon or supplied discount can reduce an order price',()=>{
  for(const plan of [...instantPlans,...challengePlans]){
    const submitted={account_type:plan.type,account_size:plan.size,broker:'Pocket Option',payment_method:'USDT TRC20',coupon:'ANYCODE',price:1}
    const order=prepareOrder(submitted)
    assert.equal(order.price,plan.price)
    assert.equal(order.coupon,null)
  }
})