const main = document.querySelector('main');
const day = document.getElementById('day');
const week = document.getElementById('week');
const month = document.getElementById('month');
const datas = [];

getData();
document.addEventListener('click', changeActiveTab);

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
  let id, title, time, previous, past;
  id = `${data.title.replace(/\s+/g, '')}`
  title = data.title;
  if (day.classList.contains('active')) {
    time = data.timeframes.daily.current;
    previous = data.timeframes.daily.previous;
    past = 'Yesterday - ';
  } else if (week.classList.contains('active')) {
    time = data.timeframes.weekly.current;
    previous = data.timeframes.weekly.previous;
    past = 'Last Week - ';
  } else {
    time = data.timeframes.monthly.current;
    previous = data.timeframes.monthly.previous;
    past = 'Last Month - ';
  }
  addHrs(id, title, time, previous, past);
}
function addHrs(id, title, time, previous, past) {
  time += time > 1 ? 'hrs' : 'hr';
  previous = past + previous + (previous > 1 ? 'hrs' : 'hr');

  appendData(id, title, time, previous);
}

function appendData(id, title, time, previous) {
  const sect = document.createElement('section');
  sect.id = id;
  sect.innerHTML = `
    <section class="card">
      <div class="row1">
        <h2 class="subHeading">${title}</h3>
        <img class="options" src="assets/images/icon-ellipsis.svg" alt="options">
      </div>
      <div class="row2">
        <p class="Time">${time}</p>
        <p class="Previous">${previous}</p>
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
  if (target === day)
    setActiveTab(day);
  else if (target === week)
    setActiveTab(week);
  else if (target === month)
    setActiveTab(month);
  getData();
}

function setActiveTab(tab) {
  day.classList.remove('active');
  week.classList.remove('active');
  month.classList.remove('active');
  tab.classList.add('active');
}