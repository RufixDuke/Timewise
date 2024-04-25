export const calculateTimeRemaining = (alarmTime) => {
  const currentTime = new Date();
  const timeDifference = alarmTime.getTime() - currentTime.getTime();

  if (timeDifference < 0) {
    return "Alarm sounds now";
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  let remainingTime = "Alarm sounds in";
  if (hours > 0) {
    remainingTime += ` ${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  if (minutes > 0) {
    remainingTime += ` ${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }

  return remainingTime;
};

export const isTaskActive = (fromTime, toTime) => {
  const currentTime = new Date(); // Get current time
  const from = new Date(fromTime); // Convert fromTime to Date object
  // console.log(from);
  const to = new Date(toTime); // Convert toTime to Date object

  // Check if current time is between fromTime and toTime
  return currentTime >= from && currentTime <= to;
};

export const isCurrentDay = (date) => {
  const currentDate = new Date(); // Get current date
  const givenDate = new Date(date); // Convert given date to Date object

  // Check if the year, month, and day of the given date match the current date
  return (
    currentDate.getFullYear() === givenDate.getFullYear() &&
    currentDate.getMonth() === givenDate.getMonth() &&
    currentDate.getDate() === givenDate.getDate()
  );
};
