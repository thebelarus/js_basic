function generateWhiteEmailList(emailList, blackEmailList){
    let whiteEmailList = [];
    for (let email of emailList) {
        if (!blackEmailList.includes(email)) {
            whiteEmailList.push(email);
        }
    }
    return whiteEmailList;
}

export default generateWhiteEmailList;