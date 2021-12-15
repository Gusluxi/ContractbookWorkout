const datesTableBody = document.getElementById("date-table-tbody");


fetch(APIUrl + "/challengeamounts")
    .then(respose => respose.json())
    .then(challengeAmounts => {
        challengeAmounts.map(createDatesTableRow);
    });

function createDatesTableRow(challengeAmount) {
    const challengeAmountRow = document.createElement("tr");
    challengeAmountRow.id = "challenge"+challengeAmount.id;
    datesTableBody.appendChild(challengeAmountRow);
    constructDateTableRow(challengeAmountRow, challengeAmount);
}

document.getElementById("create-challenge").addEventListener("click", () => createChallenge());

function createChallenge() {
    const newChallengeAmount = {
        challengeAmount: document.getElementById("create-count").value,
        challengeMonth: document.getElementById("create-month").value,
        challengeYear: document.getElementById("create-year").value
    }
    fetch(APIUrl+"/challengeamounts", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newChallengeAmount)
    })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                createDatesTableRow(newChallengeAmount);
            } else {
                console.log("challenge Amount not created", response.status);
            }
        })
        .catch(error => console.log("Network related error: " + error));
}


function constructDateTableRow(challengeTableRow, challengeAmount) {

    challengeTableRow.innerHTML = `
            <td>
                ${challengeAmount.challengeYear}
            </td>
            <td>
                ${challengeAmount.challengeMonth}
            </td>
            <td>
                ${challengeAmount.challengeAmount}
            </td>
            <td>
                <button id="update-button-${challengeAmount.id}">🛠️</button>
                <button onclick="deleteChallenge(${challengeAmount.id})">❌</button>
            </td>
    `;

    document.getElementById(`update-button-${challengeAmount.id}`)
        .addEventListener("click", () => editChallenge(challengeAmount))


}

function deleteChallenge(challengeId) {
    fetch(APIUrl + "/challengeamounts/" + challengeId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById("challenge"+challengeId).remove();
        } else {
            console.log(response.status);
        }
    });
}

function editChallenge(challengeAmount) {
    console.log(challengeAmount)
    const tableRowToUpdate = document.getElementById("challenge"+challengeAmount.id);

    tableRowToUpdate.innerHTML = `
            <td>
                <input class="input-challenge" id="update-year-${challengeAmount.id}" value="${challengeAmount.challengeYear}">
            </td>
            <td>
                <input class="input-challenge" id="update-month-${challengeAmount.id}" value="${challengeAmount.challengeMonth}">
            </td>
            <td>
                <input class="input-challenge" id="update-amount-${challengeAmount.id}" value="${challengeAmount.challengeAmount}">
            </td>
            <td>
                <button onclick="saveChallenge(${challengeAmount.id})">Save</button>
                <button id="cancel-button-${challengeAmount.id}"">Cancel</button>
            </td>
    `
    document.getElementById(`cancel-button-${challengeAmount.id}`)
        .addEventListener("click", () => cancelChallenge(challengeAmount))
}

function cancelChallenge(challengeAmount) {
    const challengeTableRow = document.getElementById("challenge"+challengeAmount.id)
    constructDateTableRow(challengeTableRow, challengeAmount)
}

function saveChallenge(challengeAmountId) {
    const tableRowToUpdate = document.getElementById("challenge"+challengeAmountId);

    const challengeAmountToUpdate = {
        id: challengeAmountId,
        challengeAmount: document.getElementById(`update-amount-${challengeAmountId}`).value,
        challengeMonth: document.getElementById(`update-month-${challengeAmountId}`).value,
        challengeYear: document.getElementById(`update-year-${challengeAmountId}`).value
    }

    fetch(APIUrl+"/challengeamounts/"+challengeAmountId, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(challengeAmountToUpdate)
    })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                constructDateTableRow(tableRowToUpdate, challengeAmountToUpdate);
            } else {
                console.log("challenge amount not updated", response.status);
            }
        })
}

