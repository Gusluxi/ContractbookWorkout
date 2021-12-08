const dashboardPrizesDiv = document.getElementById("dashboard-prizes");
const prizeHeader = document.createElement("header");
prizeHeader.innerHTML = `<div class="header">Prizes of ${date.getFullYear()}</div>`
dashboardPrizesDiv.appendChild(prizeHeader);

fetch(APIUrl + "/prizes")
    .then(response => response.json())
    .then(prizes => {
        console.log("Prizes",prizes);
        prizes.sort(function(prizeA, prizeB) {
            return prizeA.challengeGoal - prizeB.challengeGoal;
        });
        prizes.map(displayPrizes)
    })

function displayPrizes(prizes) {
    const prizeCardDiv = document.createElement("div");
    prizeCardDiv.id=prizes.id;

    prizeCardDiv.innerHTML = `
        <div class="prize-card">
            <div class="image-wrapper">
                <img src="${prizes.prizeImage}" alt="Image of ${prizes.prizeName}">
            </div>
            <div class="title-description-challenge-wrapper">
            <div class="title-wrapper">
                ${prizes.prizeName} - ${prizes.challengeGoal}
                </div>
                <div class="description-wrapper">
                    ${prizes.description}
                </div>
                   
            </div>
        </div>
    `
    dashboardPrizesDiv.appendChild(prizeCardDiv)

}