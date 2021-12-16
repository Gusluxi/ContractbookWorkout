

function addNewPrize() {

    const newPrize = {
        prizeName: document.getElementById(`prize-name`).value,
        description: document.getElementById(`description`).value,
        prizeImage: document.getElementById(`image-link`).value,
        challengeGoal: document.getElementById(`challenge-goal`).value
    };
    console.log(newPrize);

    fetch(APIUrl + "/prizes", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newPrize)
    })
        .then(response => {
            if (response.status === 200) {
                console.log("New prize added");
            } else {
                console.log("New prize not created", response.status);
            }
        })
        .catch(error => console.log("Network related error: ", error));
}