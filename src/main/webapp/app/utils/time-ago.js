import declOfNum from './number-dec';

const DURATION_IN_SECONDS = {
  epochs: ['year', 'month', 'day', 'hour', 'minute', 'second'],
  year:   31536000,
  month:  2592000,
  day:    86400,
  hour:   3600,
  minute: 60,
  second: 1
};

const TRANSLATIONS = {
  year:   [`год`, `года`, `лет`],
  month:  [`месяц`, `месяца`, `месяцев`],
  day:    [`день`, `дня`, `дней`],
  hour:   [`час`, `часа`, `часов`],
  minute: [`минута`, `минуту`, `минут`],
  second: [`секунда`, `секунду`, `секунд`]
};

function getDuration(seconds) {
  var epoch, interval;

  for (var i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
    epoch = DURATION_IN_SECONDS.epochs[i];
    interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
    if (interval >= 1) {
      return { interval: interval, epoch: declOfNum(interval, TRANSLATIONS[epoch]) };
    }
  }
}

function timeAgo(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  var duration = getDuration(seconds);
  var suffix  = (duration.interval > 1 || duration.interval === 0) ? 's' : '';
  return duration.interval + ' ' + duration.epoch; // + suffix;
}


export default timeAgo;

// alert(timeSince('2015-09-17T18:53:23'));
