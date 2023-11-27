import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');

export const getMonthDays = (startDate, endDate) => {
  const result = [];

  let currentDateUnix = moment(startDate, 'YYYY-MM-DD');
  let i = 0;

  result.push({
    date: `${currentDateUnix.format('DD')} ${currentDateUnix.format('MMMM')}`,
    dateString: currentDateUnix.format('YYYY-MM-DD'),
    day: currentDateUnix.format('ddd'),
    id: i,
  });

  do {
    currentDateUnix = currentDateUnix.add(1, 'day');
    i++;

    result.push({
      date: `${currentDateUnix.format('DD')} ${currentDateUnix.format('MMMM')}`,
      dateString: currentDateUnix.format('YYYY-MM-DD'),
      day: currentDateUnix.format('ddd'),
      id: i,
    });
  } while (currentDateUnix.format('YYYY-MM-DD') !== endDate);

  return result;
};

export const getHours = () => {
  const result = [];
  for (let i = 6; i < 22; i++) {
    result.push(
      {
        id: i,
        time: `${i}:00`,
        disabled: true,
      },
      {
        id: i + 0.5,
        time: `${i}:30`,
        disabled: true,
      },
    );
  }
  return result;
};

export const timeToNumber = (time) => Number(time.split(':').join(''));

export const numberToTime = (timeNumber) => {
  const timeArray = timeNumber.toString().split('');
  if (timeArray.length === 2) {
    return `00:${timeNumber}`;
  }
  let convertedTime = [...timeArray];
  if (convertedTime.length === 3) {
    convertedTime = ['0', ...convertedTime];
  }
  convertedTime.splice(2, 0, ':');
  return convertedTime.join('');
};

export const getDisabledTimeSlots = (times, date) => {
  const timeSchedule = getHours();
  if (!times.length) {
    return timeSchedule.map((schedule) => ({ ...schedule, disabled: true }));
  }

  for (let i = 0; i < times.length; i++) {
    const fromTimeInt = timeToNumber(times[i].from);
    const toTimeInt = timeToNumber(times[i].to);

    for (let j = 0; j < timeSchedule.length; j++) {
      const timeFromSlot = timeToNumber(timeSchedule[j].time);

      // Don't allow booking appointments in the past and 15 minutes before start the appointment
      if (currentDate === date && timeFromSlot <= timeToNumber(moment().add(15, 'minutes').format('HH:mm'))) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (timeFromSlot >= fromTimeInt && timeFromSlot < toTimeInt) {
        timeSchedule[j].disabled = false;
      }
    }
  }

  return timeSchedule;
};
