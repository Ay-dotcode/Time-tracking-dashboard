const main = document.querySelector('main');
const day = document.getElementById('day');
const week = document.getElementById('week');
const month = document.getElementById('month');
const datas = [];

getData();

function getData() {
  if (datas.length > 0) {
    datas.forEach(setData);
  } else {
    fetch("../../data.json")
      .then(response => response.json())
      .then(data => {
        datas.push(...data);
        datas.forEach(setData);
      })
      .catch(error => console.error(error));
  }
}

function setData(data) {
  let id, title, time, previous;
  id = `${data.title.replace(/\s+/g, '')}`
  title = data.title;
  if (day.classList.contains('active')) {
    time = data.timeframes.daily.current;
    previous = `Yesterday - ${data.timeframes.daily.previous}`;
  } else if (week.classList.contains('active')) {
    time = data.timeframes.weekly.current;
    previous = `Last week - ${data.timeframes.weekly.previous}`;
  } else {
    time = data.timeframes.monthly.current;
    previous = `Last month - ${data.timeframes.monthly.previous}`;
  }
  appendData(id, title, time, previous);
}

function appendData(id, title, time, previous) {
  const sect = document.createElement('section');
  sect.id = id;
  sect.innerHTML = `
    <section class="card">
      <div class="row">
        <h3 class="subHeading">${title}</h3>
        <img class="options" src="assets/images/icon-ellipsis.svg" alt="options">
      </div>
      <div class="row">
        <p class="Time">${time}hrs</p>
        <p class="Previous">${previous}hrs</p>
      </div>
    </section>
  `;
  main.appendChild(sect);
  while (main.children.length > datas.length + 1) {
    main.removeChild(main.children[1]);
  }
}

function changeActiveTab(event) {
  const target = event.target;
  if (target === day) {
    day.classList.add('active');
    week.classList.remove('active');
    month.classList.remove('active');
  } else if (target === week) {
    day.classList.remove('active');
    week.classList.add('active');
    month.classList.remove('active');
  } else if (target === month) {
    day.classList.remove('active');
    week.classList.remove('active');
    month.classList.add('active');
  }
  getData();
}
document.addEventListener('click', changeActiveTab);