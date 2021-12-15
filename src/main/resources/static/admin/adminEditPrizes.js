const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const prizeId = URLParams.get("prizeId");
let currentPrize;
const prizeEditDiv = document.getElementById("prize-edit-box");

fetch(APIUrl + "/prizes/" + prizeId)
    .then(response => response.json())
    .then(prize => {
        currentPrize = prize;
        prize.map(constructPrizeEdit);
    });

function constructPrizeEdit() {
    const adminPrizeEdit = document.createElement("div");

    adminPrizeEdit.innerHTML = `
    
    `


}