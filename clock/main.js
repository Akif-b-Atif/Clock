const displayTime = document.getElementById("time");
const displayDate = document.getElementById("date");
const hour12Format = document.getElementById("time-format-12");
const hour24Format = document.getElementById("time-format-24");
const dateDMYformat = document.getElementById("date-format-dd-mm-yy");
const dateMDYformat = document.getElementById("date-format-mm-dd-yy");
const dateWrittenFormat = document.getElementById("date-format-written");
const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

const refresher = setInterval(() => {
  const CurrentTime = new Date();
  if (hour24Format.checked) {
    const hour = zeroPad(CurrentTime.getHours());
    const min = zeroPad(CurrentTime.getMinutes());
    const sec = zeroPad(CurrentTime.getSeconds());
    displayTime.textContent = `${hour}:${min}:${sec}`;
  } else {
    const hour = zeroPad(hour12(CurrentTime.getHours()));
    const min = zeroPad(CurrentTime.getMinutes());
    const sec = zeroPad(CurrentTime.getSeconds());
    const meridean = ampm(CurrentTime.getHours());
    displayTime.textContent = `${hour}:${min}:${sec} ${meridean}`;
  }

  const date = CurrentTime.getDate();
  const month = CurrentTime.getMonth();
  const year = CurrentTime.getFullYear();
  const day = CurrentTime.getDay();
  if (dateDMYformat.checked) {
    displayDate.textContent = dateDMYformatter(date, month, year, day);
  } else if (dateMDYformat.checked) {
    displayDate.textContent = dateMDYformatter(date, month, year, day);
  } else {
    displayDate.textContent = dateWrittenFormatter(date, month, year, day);
  }
}, 500);

const zeroPad = (number)=> {
  if (number < 10) return `0${number}`;
  return number;
};
const hour12 = (hour) => {
  if (hour > 12) return hour - 12;
  else return hour;
};
const ampm = (hour) => {
  if (hour > 12) return "PM";
  else return "AM";
};
const dateWrittenFormatter = (date, month, year, day) => {
  let dateSuffix = "";
  if ((date - 1) % 10 == 0) dateSuffix = "st";
  else if ((date - 2) % 10 == 0) dateSuffix = "nd";
  else if ((date - 3) % 10 == 0) dateSuffix = "rd";
  else dateSuffix = "th";
  return `${date}${dateSuffix} of ${months[month]}, ${year} | ${days[day]}`;
};
const dateDMYformatter = (date, month, year, day) => {
  return `${date}-${month}-${year} | ${days[day]}`;
};
const dateMDYformatter = (date, month, year, day) => {
  return `${month}-${date}-${year} | ${days[day]}`;
};