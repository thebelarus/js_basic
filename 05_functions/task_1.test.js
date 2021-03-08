import generateWhiteEmailList from './task_1.js';

let emailList = [
    'deshaun50@abshire.com',
    'dorthy.emard@hotmail.com',
    'qkoepp@hotmail.com',
    'sid10@hotmail.com',
    'kelli84@veum.com',
    'hdicki@hotmail.com',
    'sherman23@reichert.com',
    'shanelle68@adams.com',
    'zemlak.elaina@kulas.com',
    'frami.ashly@eichmann.com',
    'kayla.herzog@hotmail.com',
    'nsenger@hotmail.com',
    'swaniawski.chaim@konopelski.com',
    'grant.jewell@hotmail.com',
    'cblock@hotmail.com',
    'armand28@yahoo.com',
    'oconn@medhurst.info',
    'alessandro99@gmail.com',
    'phuels@collier.biz',
    'mraynor@gorczany.info',
    'ctillman@ortiz.org',
    'vesta92@morissette.com',
    'sanford.avery@casper.biz',
    'imoen@hotmail.com',
    'tmuller@fisher.biz',
    'diamond.welch@hotmail.com',
    'joyce51@yahoo.com',
    'nayeli20@beier.com',
    'jeremie54@hotmail.com',
    'terry.bogan@gmail.com'    
];

let blackEmailList = [
    'oconn@medhurst.info',
    'alessandro99@gmail.com',
    'phuels@collier.biz',
    'mraynor@gorczany.info',
    'ctillman@ortiz.org',
    'vesta92@morissette.com',
    'sanford.avery@casper.biz',
];

function testGenerateWhiteEmailList(emailList, blackEmailList) {
    // Test work of generateWhiteEmailList function from 'task 1'.
    console.log(`Количество адресов до обработки: ${emailList.length}`);
    let whiteEmails = generateWhiteEmailList(emailList, blackEmailList);
    console.log(`Количество адресов после обработки: ${whiteEmails.length}`);
    console.log(`Cписок адрессов: ${whiteEmails}`);
}

testGenerateWhiteEmailList(emailList, blackEmailList);