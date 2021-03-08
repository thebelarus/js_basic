import cartProcces from './task_2.js';

function testCartProcces(basketAmount, goodsQuantity, promoCode = null){
    // Test work of cartProcces function from 'task 2'.
    console.log(`Общая сумма корзины: ${basketAmount}`)
    console.log(`Количество товаров в корзине: ${goodsQuantity}`)
    if (promoCode) {
        console.log(`Промокод: ${promoCode}`) 
    }
    console.log(`Общая сумма корзины после работы функции: ${cartProcces(basketAmount, goodsQuantity, promoCode)}\n`);
}

testCartProcces(1000, 9, 'ДАРИМ300');
testCartProcces(200, 1, 'ДАРИМ300');
testCartProcces(10000, 11);
testCartProcces(60000, 9);