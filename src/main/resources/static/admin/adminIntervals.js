const intervalDiv = document.getElementById("workout-date-interval");

fetch(APIUrl + "/challengedates")
    .then(respose => respose.json())
    .then(challengeDates => {
        challengeDates.map(editChallengeDates)
    });

function editChallengeDates(challengeDate) {
    const intervalDatesDiv = document.createElement("div");

    intervalDatesDiv.innerHTML = `
    <label>Start </label><input type="date" id="start-challenge-date" value="${challengeDate.startDate}"><br>
    <label>End </label><input type="date" id="end-challenge-date" value="${challengeDate.endDate}"><br>
    <button id="save-date-interval">Save Date Intervals</button>
    `
    intervalDiv.appendChild(intervalDatesDiv);
    document.getElementById("save-date-interval")
        .addEventListener("click", () => {updateDateInterval(intervalDatesDiv, challengeDate)});
}

function updateDateInterval(intervalDatesDiv, challengeDate) {
    const savedDiv = document.createElement("div");
    savedDiv.style.float = "right";
    const newChallengeDate = {
        id: challengeDate.id,
        startDate: document.getElementById("start-challenge-date").value,
        endDate: document.getElementById("end-challenge-date").value
    };
    fetch(APIUrl+"/challengedates/"+challengeDate.id, {
        method: "PUT",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newChallengeDate)
    })
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                savedDiv.innerText = "Saved";
            } else {
                savedDiv.innerText = "Failed"
                console.log("challenge Intervals not saved", response.status);
            }
            intervalDatesDiv.appendChild(savedDiv);
        })
        .catch(error => console.log("Network related error: " + error));
}