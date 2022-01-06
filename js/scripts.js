const tabs = document.querySelectorAll('.tab');

document.addEventListener("DOMContentLoaded", () => {

    tabs.forEach(tab => {
        tab.addEventListener("click", loadData);
    });


});

const loadData = async (e) => {

    const time = e.target.dataset.time;

    try {
        const url = window.location + "/data.json";

        const res = await fetch(url);
        const data = await res.json();
        
        changeActiveTab(e);
        changeData(data, time);
        

    } catch (error) {
        console.log(error);
    }

}

const changeData = (dataArray, time) => {

    dataArray.forEach(data => {

        let cardTimeData;
        let cardPreviousData;
        let cardTimeInfoData;

        if (time === "daily") {
            cardTimeData = data.timeframes.daily.current;
            cardPreviousData = data.timeframes.daily.previous;
            cardTimeInfoData = "Yesterday";
        }

        if (time === "weekly") {
            cardTimeData = data.timeframes.weekly.current;
            cardPreviousData = data.timeframes.weekly.previous;
            cardTimeInfoData = "Last Week";
        }

        if (time === "monthly") {
            cardTimeData = data.timeframes.monthly.current;
            cardPreviousData = data.timeframes.monthly.previous;
            cardTimeInfoData = "Last Month";
        }

        const card = document.querySelector(`[data-card="${data.title}"]`);

        const cardTime = card.querySelector(".card-time");
        const cardPreviousTime = card.querySelector(".card-previous-time");

        cardTime.innerText = `${cardTimeData}${cardTimeData == 1 ? "hr" : "hrs"}`;
        cardPreviousTime.innerText = `${cardTimeInfoData} - ${cardPreviousData}${cardPreviousData == 1 ? "hr" : "hrs"}`;

    });

}

const changeActiveTab = (e) => {

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    e.target.classList.add("active");

}