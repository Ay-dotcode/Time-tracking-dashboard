const main = document.querySelector('main');
const daily = document.querySelector('daily');
let time, previous;
getData();

function getData() {
  fetch("../../data.json")
    .then(response => response.json())
    .then(datas => datas.forEach(setData))
    .catch(error => console.error(error));
}
function setData(data) {
  if (day.classList.contains('active')) {
    time = data.timeframes.daily.current;
    previous = `Yesterday - ${data.timeframes.daily.previous}`
  } else if (week.classList.contains('active')) {
    time = data.timeframes.weekly.current;
    previous = `Last week - ${data.timeframes.weekly.previous}`
  } else {
    time = data.timeframes.monthly.current;
    previous = `Last month - ${data.timeframes.monthly.previous}`
  }
  appendData(time, previous, data);
}
function appendData(time, previous, data) {
  let sect = document.createElement('section');
  sect.id = `${data.title.replace(/\s+/g, '')}`
  sect.innerHTML += `
      <section class="card">
        <div class="row">
          <h3 class="subHeading"> ${data.title}</h3>
          <img class="options" src="assets/images/icon-ellipsis.svg" alt="options">
        </div>
        <div class="row">
          <p class="Time"> ${time}hrs</p>
          <p class="Previous">${previous}hrs</p>
        </div>
      </section>
     `
  main.appendChild(sect);
}
function changeday() {
  day.classList.add('active');
  week.classList.remove('active');
  month.classList.remove('active');
  // Remove all children of main except the first one
  while (main.children.length > 1) {
    main.removeChild(main.lastChild);
  }
  getData();
}
function changeweek() {
  day.classList.remove('active');
  week.classList.add('active');
  month.classList.remove('active');
  // Remove all children of main except the first one
  while (main.children.length > 1) {
    main.removeChild(main.lastChild);
  }
  getData();
}
function changemonth() {
  day.classList.remove('active');
  week.classList.remove('active');
  month.classList.add('active');
  // Remove all children of main except the first one
  while (main.children.length > 1) {
    main.removeChild(main.lastChild);
  }
  getData();
}