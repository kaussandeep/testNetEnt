(function() {
    var WIN = {
        1: "No Win, try again.",
        2: "Small win, try again to win more.",
        3: "Big win, congratulation."
    };


    var SPINING_TIME = 500;

    var resultEl = document.querySelector("#result"),
        resultElList = [
            result.querySelector("div:nth-of-type(1)"),
            result.querySelector("div:nth-of-type(2)"),
            result.querySelector("div:nth-of-type(3)")
        ],
        startBtn = document.querySelector("#start"),
        statusEl = document.querySelector("#status"),
        timer;

    var NETENT = {
        ajax: function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        },
        getWinStatus: function(value) {
            var winStatus = {},
                highestScore = 1,
                elementIdx = [];

            // Count the same value
            value.forEach(function(v, idx) {
                if (!winStatus[v]) {
                    winStatus[v] = {
                        score: 1,
                        elementIdx: [idx]
                    };
                } else {
                    winStatus[v].score = winStatus[v].score + 1;
                    winStatus[v].elementIdx.push(idx);
                }
            });

            // Check the highest score
            Object.keys(winStatus).forEach(function(key, idx) {
                var item = winStatus[key];

                if (item.score >= highestScore) {
                    highestScore = item.score;
                    elementIdx = item.elementIdx;
                }
            });

            return {
                elementIdx: elementIdx.length > 1 ? elementIdx : [],
                text: WIN[highestScore]
            };
        },
        draw: function(value, winStatus) {
            resultElList.forEach(function(el, idx){
                el.style.backgroundImage = "url(/Symbol_" + value[idx] + ".png)";
                if (winStatus.elementIdx.indexOf(idx) >= 0) {
                    el.classList.add("pulse");
                } else {
                    el.classList.remove("pulse");
                }
            });
        },
        updateStatus: function(value){
            var winStatus = this.getWinStatus(value);
            statusEl.textContent = winStatus.text;
            return winStatus;
        },
    };

    start.addEventListener("click", function() {
        // Prevent multiple click from user
        if (document.body.classList.contains("spin")) {
            return;
        }

        document.body.classList.add("spin");

        clearTimeout(timer);

        timer = setTimeout(function() {
            document.body.classList.remove("spin");
        }, SPINING_TIME);

        // get the outcome
        NETENT.ajax("/outcome.json", function(result) {
            result = JSON.parse(result);

            if (!result.error) {
                    var winStatus = NETENT.updateStatus(result.value);
                    NETENT.draw(result.value, winStatus);
            } else {
                alert("Please reload");
            }
        });
    });
})();