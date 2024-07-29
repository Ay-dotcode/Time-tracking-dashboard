fetch("../../data.json")
    .then(response => response.json())
    .then(datas => datas.forEach(appendData))
    .catch(error => console.error(error));

const main = document.querySelector('main');

function appendData(data) {
    main.innerHTML += `
    <section id="${data.title.replace(/\s+/g, '')}">
      <section class="card">
        <div class="row">
          <h3 class="subHeading"> ${data.title}</h3>
          <img class="options" src="assets/images/icon-ellipsis.svg" alt="options">
        </div>
        <div class="row">
          <p class="daily Time"> ${data.timeframes.daily.current}hrs</p>
          <p class="daily Previous">Yesterday - ${data.timeframes.daily.previous}hrs</p>
          <p class="weekly Time">${data.timeframes.weekly.current}hrs</p>
          <p class="weekly Previous"> Last week - ${data.timeframes.weekly.previous}hrs</p>
          <p class="monthly Time"> ${data.timeframes.monthly.current}hrs</p>
          <p class="monthly Previous"> Last month - ${data.timeframes.monthly.previous}hrs</p>
        </div>
      </section>
    </section>
     `
}
