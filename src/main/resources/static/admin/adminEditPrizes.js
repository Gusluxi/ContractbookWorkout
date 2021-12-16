const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const prizeId = URLParams.get("prizeId");
let currentPrize;
const prizeEditDiv = document.getElementById("edit-prize-box");

fetch(APIUrl + "/prizes/" + prizeId )
    .then(response => response.json())
    .then(prizes => {
        console.log(prizes);
        currentPrize = prizes;
        constructPrizeEdit(prizes);
    });



function constructPrizeEdit(prize) {
    const adminPrizeEdit = document.createElement("div");

    prizeEditDiv.appendChild(adminPrizeEdit);

    adminPrizeEdit.innerHTML = `
    <h1>Update prize information</h1>
    
    <div id="inner-edit-prize-box">    
    <label>Prize name: </label>
        <input class="input-prize-name" id="update-name-${prize.id}" value="${prize.prizeName}">
        <label>Prize description: </label>
        <textarea class="input-prize-description" id="update-description-${prize.id}">${prize.description}</textarea>
        <label>Prize image-URL: </label>
        <input class="input-prize-image-link" id="update-image-link-${prize.id}" value="${prize.prizeImage}">
        <label>Prize challenge goal: </label>
        <input class="input-prize-challenge-goal" id="update-challenge-goal-${prize.id}" value="${prize.challengeGoal}">
        <div id="buttons">
        <a href="admin.html"><button onclick="savePrizeChanges(${prize.id})">Save changes</button></a>
        <a href="admin.html"><button id="delete-button" onclick="deletePrize()">Delete prize</button></a>
         </div>
    </div>
    `;
}

function deletePrize() {
    fetch(APIUrl + "/prizes/" + prizeId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(prizeId).remove();
        } else {
            console.log(response.status);
        }
    });
}


function savePrizeChanges(prize) {

    const updatedPrize = {
        id: prizeId,
        prizeName: document.getElementById(`update-name-${prize}`).value,
        description: document.getElementById(`update-description-${prize}`).value,
        prizeImage: document.getElementById(`update-image-link-${prize}`).value,
        challengeGoal: document.getElementById(`update-challenge-goal-${prize}`).value
    }
    console.log(updatedPrize);

    fetch(APIUrl +"/prizes/" + prizeId, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(updatedPrize)
    })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                console.log("We dit it")
            } else {
                console.log("Prize not updated", response.status);
            }
        })
}