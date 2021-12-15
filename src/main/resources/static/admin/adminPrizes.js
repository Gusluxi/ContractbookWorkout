const adminPrizesDiv = document.getElementById("admin-prizes");
const adminPrizeHeader = document.createElement("admin-header");
adminPrizeHeader.innerHTML = `<div class="admin-header">Prizes of </div>`
adminPrizesDiv.appendChild(adminPrizeHeader);

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
    <a href="./adminEditPrizes.html?prizeId=${prizes.id}"
        <div class="admin-prize-card">  
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
    </a>
    `
    adminPrizesDiv.appendChild(prizeCardDiv)

}