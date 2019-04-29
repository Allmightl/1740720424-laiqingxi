const express = require('express');
const app = express();

const path = require('path');

//const randomCards = require('./card');
const bodyParser = require('body-parser')


const {
    pokers,
    randomCards,
    CardGroup
} = require('./card')

const port = 4000;

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.json());

const jsonParser = bodyParser.json()
let randIdx = [];

//const cardModule = require('./card');
//const randomCards = cardModule.randomCards;

app.use(express.static('public'));


app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'public', 'card.html');
    res.sendFile(htmlPath);


})

app.get('/random', (req, res) => {
    randIdx = randomCards(); // [0,12,1,3,4]

    //pokers
    const cards = genCardGroup(randIdx)

    console.log('--- cards: ', cards)

    res.json({
        cards: cards, 
        result: cards.judge()

    });
})


let gameStart = false
let gameCoin = 10000
let gameCards
let pourCoin = 0
const gameBonus = {
    '5K': 5000,
    'rs': 2000,
    'sf': 800,
    '4K': 400
}

app.post('/pour', (req, res) => {
    if (gameStart) {
        res.json({
            code: 1,
            desc: '游戏已经开始，不能下注'
        })
        return
    }

    let coin = req.body.coin
    if (coin < 1) {
        res.json({
            code: 1,
            desc: '下注金额不能为0'
        })
        return
    }

    if (gameCoin < coin) {
        return
    }
    pourCoin = coin
    gameCoin -= coin
    gameStart = true


    let gameCards = randomCards()
    const cards = genCardGroup(gameCards)


    const bonusInc = parseInt(coin / 80)
    for (let k in gameBonus) {
        gameBonus[k] += bonusInc
    }
    gameCards = randomCards()

    const cardIdx = randomCards()

    //gameCards = temp

    randIdx.forEach(id => {

        cards.push(pokers[id])
    })
    gameStart = false
    res.json({
        cards: cards,
    })

})

function genCardGroup(indexes) {
    console.log('---- indexes：', indexes) // [21, 43, 1, 42, 53]
    const cards = new CardGroup()
    indexes.forEach(id => {
        cards.push(pokers[id])
    })
    return cards
}

app.post('/switch', (req, res) => {
    /*
    change = [0,1,3],[]
    */
    if (!gameStart) {
        res.json({
            code: 2,
            desc: '游戏未开始'
        })
        return
    }
    /*
    keep = [0,1,3],[]
    */

    const keep = req.body.keep
    if (!keep) keep = []

    const temp = []
    for (let i = 0; i < 5; i++) {
        if (keeep.includes(i)) {
            temp.push(gameCards[i])
        } else {
            temp.push(null)
        }
    }


    gameCards = temp
    const cards = genCardGroup(gameCards)

    keep.forEach(keepID => {
        const temp = []
        gameCards.forEach(idx => {
            temp.push(idx) || (null)

        })

    })
    gameStart = false

    const result = cards.judge()
    const winCoin = (winRates[result] || 0) * req.body.pourCoin

    if (winCoin > 0)
        gameCoin += winCoin

    res.json({
        Cards,
        result,
        winCoin,
        gameCoin
    })
})

const winRates = {
    'is5k': 750,
    'isrs': 250,
    'issf': 150,
    'is4k': 60,
    'isfh': 10,
    'isfl': 7,
    'isst': 5,
    'is3k': 3,
    'is2p': 2,
    'is1p': 1
}


app.listen(port, function () {
    console.log("start");
})