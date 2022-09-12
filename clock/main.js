const displayTime = document.getElementById("time");
const displayDate = document.getElementById("date");
const hour12Format = document.getElementById("time-format-12");
const hour24Format = document.getElementById("time-format-24");
const dateDMYformat = document.getElementById("date-format-dd-mm-yy");
const dateMDYformat = document.getElementById("date-format-mm-dd-yy");
const dateWrittenFormat = document.getElementById("date-format-written");
const days = {
  1: "Sunday",
  2: "Monday",
  3: "Tuesday",
  4: "Wednesday",
  5: "Thursday",
  6: "Friday",
  7: "Saturday",
};
const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const refresher = setInterval(() => {
  const CurrentTime = new Date();
  const min = zeroPad(CurrentTime.getMinutes());
  const sec = zeroPad(CurrentTime.getSeconds());
  if (hour24Format.checked) {
    const hour = zeroPad(CurrentTime.getHours());
    displayTime.textContent = `${hour}:${min}:${sec}`;
  } else {
    const hour = zeroPad(hour12(CurrentTime.getHours()));
    const ampm = meridean(CurrentTime.getHours());
    displayTime.textContent = `${hour}:${min}:${sec} ${ampm}`;
  }

  const date = CurrentTime.getDate();
  const month = CurrentTime.getMonth() + 1;
  const year = CurrentTime.getFullYear();
  const day = CurrentTime.getDay() + 1;
  if (dateDMYformat.checked) {
    displayDate.textContent = dateDMYformatter(date, month, year, day);
  } else if (dateMDYformat.checked) {
    displayDate.textContent = dateMDYformatter(date, month, year, day);
  } else {
    displayDate.textContent = dateWrittenFormatter(date, month, year, day);
  }
}, 250);

const zeroPad = (number) => {
  if (number < 10) return `0${number}`;
  return number;
};
const hour12 = (hour) => {
  if (hour > 12) return hour - 12;
  else return hour;
};
const meridean = (hour) => {
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

