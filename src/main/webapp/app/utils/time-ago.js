import declOfNum from './number-dec';
import { t } from 'localizify';

const DURATION_IN_SECONDS = {
  epochs: ['year', 'month', 'day', 'hour', 'minute', 'second'],
  year:   31536000,
  month:  2592000,
  day:    86400,
  hour:   3600,
  minute: 60,
  second: 1
};

const getTranslations = () => ({
  year:   [t('year'), t('years'), t('years 2')],
  month:  [t('month'), t('months'), t('months 2')],
  day:    [t('day'), t('days'), t('days 2')],
  hour:   [t('hour'), t('hours'), t('hours 2')],
  minute: [t('minute'), t('minutes'), t('minutes 2')],
  second: [t('second'), t('seconds'), t('seconds 2')]
});

function getDuration(seconds) {
  var epoch, interval;

  for (var i = 0; i < DURATION_IN_SECONDS.epochs.length; i++) {
    epoch = DURATION_IN_SECONDS.epochs[i];
    interval = Math.floor(seconds / DURATION_IN_SECONDS[epoch]);
    if (interval >= 1) {
      return { interval: interval, epoch: declOfNum(interval, getTranslations()[epoch]) };
    }
  }
}

function timeAgo(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  var duration = getDuration(seconds);
  if (!duration || !duration.interval) {
    return t('right now');
  }
  var suffix  = ' ' + t('ago'); //(duration.interval > 1 || duration.interval === 0) ? 's' : '';
  return duration.interval + ' ' + duration.epoch + suffix;
}


export default timeAgo;

// alert(timeSince('2015-09-17T18:53:23'));
