

socket.on('avaliableOffers', offers => {
    console.log('avaliable offers on client side:::', offers);
    createOfferEls(offers);
});
socket.on('newOfferAwaiting', offers => {
    console.log('new offer waiting:::', offers)
    createOfferEls(offers);
})

function createOfferEls(offers) {
    //make a button for offer:::
    const answerEle = document.querySelector('#answer');
    offers.forEach(o => {
        console.log("offer's element::::::", o);
        const newOfferEle = document.createElement('div');
        newOfferEle.innerHTML = `<button class = "btn btn-success col-1">Answer ${o.offererUserName}</button>`;
        answerEle.addEventListener('click', () => answerOffer(o));
        answerEle.appendChild(newOfferEle);
    });
}