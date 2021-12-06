const dashboardPrizesDiv = document.getElementById("dashboard-prizes");
const prizeHeader = document.createElement("header");
prizeHeader.innerHTML = `<div class="header-prize">Prizes of ${monthNames[date.getMonth()]}</div>`
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
                ${prizes.prizeName}<br>
                </div>
                <div class="description-wrapper">
                    Description: ${prizes.description}
                </div>
                <div class="challenge-wrapper">
                    Challenge Goal #${prizes.challengeGoal}
                </div>
            </div>
        </div>
    `
    dashboardPrizesDiv.appendChild(prizeCardDiv)

}