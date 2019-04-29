/*
    纸牌类型type:0~5
        0:Jocker
    纸牌面值value:0~14
        0:Black Joker
        1:Red Joker
*/

const JOKER = 0;
const SPADE = 1;
const DIAMOND = 2;
const HEART = 3;
const CLUB = 4;

const TYPE_MAP = {
    0: 'JOKER',
    1: 'SPADE',
    2: 'DIAMOND',
    3: 'HEART',
    4: 'CLUB'
};

const VALUE_MAP = {
    0: 'Black_Joker',
    1: 'Red_Joker',
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A',
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10"

}

const BLACK_JOKER = 0;
const RED_JOKER = 1;

class Card {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    get type() {
        return this._type;
    }
    set type(t) {
        if (t < 0 || t > 4) {
            this._type = 0;
        } else {
            this._type = t;
        }
    }

    get value() {
        return this._value;
    }
    set value(v) {
        if (this.type === JOKER) {
            if (v < 0 || v > 1) {
                this._value = 0;
            } else {
                this._value = v;
            }
        } else {
            if (v < 0 || v > 14) {
                this._value = 2;
            } else {
                this._value = v;
            }
        }
    }

    relativeURL() {
        return `./cardimg/images/${this._type}/${this._value}.png`;
    }
}

class CardGroup extends Array{
    /*
        return;
        5k,五同
        rs,皇家大顺
        sf,同花顺
        4k，4同
        fh，三带对
        fl，同花
        st，顺子
        3k，3同
        2p，2对
        1p,1对
        none:未中奖
    */
    judge(){
        /*
            1.拆分：一组为joker，一组为普通花色
            2.swith(joker.length),2,1,0
        */
        function sortNumber(a,b)//比较函数，用于sort排序
        {
            return a - b
        }
       let is5k=false;//判断是否五同
       let isrs=false;
       let issf=false;
       let is4k=false;
       let isfh=false;
       let isfl=false;
       let isst=false;
       let is3k=false;
       let is2p=false;
       let is1p=false;
       let sfcardnum=new Array();//判断同花的顺子
       let cardnum=new Array();//判断顺子
       let rscolor=0;//判断颜色相同的牌数
       let likecard=new Array(5).fill(1);//判断相同值得数目
       const jokerArr=[],normalArr=[];
       for(const card of this){
           if(card.type==JOKER){
               jokerArr.push(card);
           }else{
               normalArr.push(card);
           }
       }
       //5k
       const w=normalArr[0].type;
       if(jokerArr.length>0)
       {
           const v=normalArr[0].value;
           for(const card of normalArr)
           {
               if(v===card.value||card.type===JOKER)
               {
                    is5k=true;
               }else{
                   is5k=false;
                   break;
               }
           }
           if(is5k)
           {
               return 'is5k';
           }else{//判断皇家大顺
               let rs9=0;//判断是否有JQK
               let rsA=0;
               let rscard=0;//判断9~A的牌数
               for(let card of normalArr)
                {
                    if(card.value===9)
                    {
                        rs9++;
                        rscard++;
                    }
                    if(card.value===10)
                    {
                        rscard++;
                    }
                    if(card.value===11)
                    {
                        rscard++;
                    }
                    if(card.value===12)
                    {
                        rscard++;
                    }
                    if(card.value===13)
                    {
                        rscard++;
                    }
                    if(card.value===14)
                    {
                        rsA++;
                        rscard++;
                    }
                    if(card.type===w)
                    {
                        rscolor++;
                    }
                }
                if(rscolor===normalArr.length){
                    if((rscard===4&&rsA===0)||(rscard===4&&rs9===0))
                    {
                        isrs=true;
                    }else if((rscard===3&&rsA===0)||(rscard===4&&rs9===0))
                    {
                        isrs=true;
                    }
                } 
           }
           if(isrs){//如果不是rs判断sf
            return 'isrs';
            }else{
                    for(let card of normalArr)
                    {
                        if(card.type===w)
                        {
                            sfcardnum.push(card.value);
                        }
                    }
                    if(sfcardnum.length===5-jokerArr.length)//判断除了王其他同色
                    {
                        sfcardnum = sfcardnum.sort(sortNumber);//排序
                        if(jokerArr.length===1)//如果有一张王
                        {
                            let l=1;//用王填数
                            for(let i=0;i<normalArr.length-1;i++)//判断是否为顺子,l为0即为顺子
                            {
                                if(sfcardnum[i]+1!=sfcardnum[i+1]&&sfcardnum[i]!==sfcardnum[i+1])
                                {
                                    if(sfcardnum[i+1]-sfcardnum[i]>=3){
                                        l=-1;
                                        break;
                                    }else if(sfcardnum[i+1]-sfcardnum[i]==2){
                                        l--;
                                        continue;
                                    }
                                }else if(sfcardnum[i]+1===sfcardnum[i+1]){
                                    l=l;
                                    continue;
                                }
                            }
                            if(l>=0)//同花顺子
                            {
                                issf=true;
                            }else
                            {
                                issf=false;
                            } 
                        }else if(jokerArr.length===2)//如果有两张王
                        {
                            let l=2;//用王填数
                            for(let i=0;i<normalArr.length-1;i++)//判断是否为顺子,l为0即为顺子
                            {
                                if(sfcardnum[i]+1!=csfcardnum[i+1]&&sfcardnum[i]!==sfcardnum[i+1])
                                {
                                    if(sfcardnum[i+1]-sfcardnum[i]>=4){
                                        l=-1;
                                        break;
                                    }else if(sfcardnum[i+1]-sfcardnum[i]==2){
                                        l--;
                                        continue;
                                    }else if(sfcardnum[i+1]-sfcardnum[i]==3){
                                        l=i-2;
                                        continue;
                                    } 
                                }else if(sfcardnum[i]+1===sfcardnum[i+1]){
                                    l=l;
                                    continue;
                                }
                            }
                            if(l>=0)//是同花顺子
                            {
                                issf=true;
                            }
                        }
                    }
                }
            if(issf){
                return 'issf';
            }else{//判断四同
                for(let i=0;i<normalArr.length;i++)
                {
                    let j = i + 1;
                    let k = i;
                    while(k>=0&&j<normalArr.length)
                    {
                        if(normalArr[j].value===normalArr[k].value)
                        {
                            likecard[k]++;
                        }
                        k=k-1;
                    }
                }
                for(let i of likecard)
                {
                    if(i+jokerArr.length===4)
                    {
                        is4k=true;
                        break;
                    }
                }
            }
            if(is4k){
                return 'is4k';
            }else{//判断三带一对
                if(jokerArr.length===1){
                    let l = 0;//判断是否存在三对其他牌的一对
                    for(let i of likecard)
                    {
                        if(i===2){
                            l++;
                        }
                        if(l===2){
                            for(let i of likecard){
                                if(i+jokerArr.length===3)
                                {
                                    isfh=true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if(isfh){
                return 'isfh';
            }else{//判断同花
                if(sfcardnum.length+jokerArr.length===5){
                    isfl=true;
                }
            }
            if(isfl){
                return 'isfl';
            }else{
                for(let card of normalArr){
                    cardnum.push(card.value);
                }
                cardnum=cardnum.sort(sortNumber);
                let like = false;//判断是否有相同
                for(let i of likecard)
                {
                    if(i!==1){
                        like=true;
                    }
                }
                if(cardnum[cardnum.length-1]-cardnum[0]<=4&&like==false){
                    isst=true;
                }
            }
            if(isst){
                return 'isst';
            }else{//三同
                for(let i of likecard)
                {
                    if(i+jokerArr.length===3)
                    {
                        is3k=true;
                        break;
                    }
                }
            }
            if(is3k){
                return 'is3k';
            }else{//判断一对
                for(let i of likecard)
                {
                    if(i+jokerArr.length===2)
                    {
                        is1p=true;
                        break;
                    }
                }
            }
            if(is1p){
                return 'is1p';
            }else{
                return '未中奖';
            }
        }else{//没有王
            let rscard=0;//判断9~A的牌数
            let rs9=0;
            let rsA=0;
            for(let card of normalArr)//判断皇家大顺
            {
                if(card.value===9)
                {
                    rs9++;
                    rscard++;
                }
                if(card.value===10)
                {
                    rscard++;
                }
                if(card.value===11)
                {
                    rscard++;
                }
                if(card.value===12)
                {
                    rscard++;
                }
                if(card.value===13)
                {
                    rscard++;
                }
                if(card.value===14)
                {
                    rsA++;
                    rscard++;
                }
                if(card.type===w)
                {
                    rscolor++;
                }
            }
            if(rscolor===normalArr.length){
                if((rscard===5&&rsA===0)||(rscard===5&&rs9===0))
                {
                    isrs=true;
                }
            }
            if(isrs){
                return 'isrs';
            }else{//判断同花顺
                for(let card of normalArr)
                {
                    if(card.type===w)
                    {
                        sfcardnum.push(card.value);
                    }
                }
                if(sfcardnum.length===5)//判断5同色
                {
                    sfcardnum = sfcardnum.sort(sortNumber);//排序
                    for(let i=0;i<normalArr.length-1;i++)//判断是否为顺子,l为0即为顺子
                    {
                        if(sfcardnum[i]+1===sfcardnum[i+1])
                        {
                            issf=true;
                            continue;
                        }else{
                            issf=false;
                            break;
                        }
                    } 
                }
                if(issf){
                    return 'issf';
                }else{//判断4K
                    for(let i=0;i<normalArr.length;i++)
                    {
                        let j = i + 1;
                        let k = i;
                        while(k>=0&&j<normalArr.length)
                        {
                            if(normalArr[j].value===normalArr[k].value)
                            {
                                likecard[k]++;
                            }
                            k=k-1;
                        }
                    }
                    for(let i of likecard)
                    {
                        if(i===4)
                        {
                            is4k=true;
                            break;
                        }
                    }
                }
                if(is4k){
                    return 'is4k';
                }else{//三带对
                    let l3 = 0;//判断三个
                    let l = 0;//判断一对
                    for(let i of likecard)
                    {
                        if(i===2){
                            l++;
                        }
                        if(i===3){
                            l3++;
                        }
                        if(l3===1&&l===2){
                            isfh=true;
                        }
                    }
                }
                if(isfh){
                    return 'isfh';
                }else{//判断同花
                    if(sfcardnum.length===5){
                        isfl=true;
                    }
                }
                if(isfl){
                    return 'isfl';
                }else{//顺子
                    for(let card of normalArr){
                        cardnum.push(card.value);
                    }
                    cardnum=cardnum.sort(sortNumber);
                    for(let i=0;i<normalArr.length-1;i++)//判断是否为顺子,l为0即为顺子
                    {
                        if(cardnum[i]+1===cardnum[i+1])
                        {
                            isst=true;
                        }else{
                            isst=false;
                            break;
                        }
                    }
                }
                if(isst){
                    return 'isst';
                }else{
                    for(let i of likecard)
                    {
                        if(i===3)
                        {
                            is3k=true;
                            break;
                        }
                    }
                }
                if(is3k){
                    return 'is3k';
                }else{//2p
                    let l=0;//判断一对的对数
                    for(let i of likecard)
                    {
                        if(i===2)
                        {
                            l++;
                        }
                        if(l===2)
                        {
                            is2p=true;
                            break;
                        }
                    }
                }
                if(is2p){
                    return 'is2p';
                }else{
                    for(let i of likecard)
                    {
                        if(i===2)
                        {
                            is1p=true;
                            break;
                        }
                    }
                }
                if(is1p){
                    return 'is1p';
                }else{
                    return '真可惜';
                }
            }
        }
    }
}

const pokers = [];

for (let i = 0; i < 5; i++) {
    if (i === JOKER) {
        pokers.push(new Card(i, 0));
        pokers.push(new Card(i, 1));
    } else {
        for (let j = 2; j < 15; j++) {
            const card = new Card(i, j);
            pokers.push(card);
        }
    }
}
// origin => underfined if null
//    [1, null ,2,3,null]                       [{type: 1, value: 1},{type: 2, value: 2}]

let randomCards = (origin) => {
    if (!origin) {
        origin = new Array(5).fill(null)
    }

    const result = origin;

    for (let i = 0; i < result.length; i++) {
        let id = result[i]

        while (!id) {
            id = Math.floor(Math.random() * 54)
            if (result.includes(id)) {
                id = null
            } else {
                result[i] = id
            }
        }
    }

    return result;
}

const cards = randomCards();
const cardGroup = new CardGroup();

for (let i = 1; i < 4; i++) {
    CardGroup.push
}



module.exports = {
    pokers,
    randomCards,
    CardGroup
}