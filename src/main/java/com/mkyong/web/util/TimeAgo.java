package com.mkyong.web.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class TimeAgo {

    public static final List<Long> times = Arrays.asList(
            TimeUnit.DAYS.toMillis(365),
            TimeUnit.DAYS.toMillis(30),
            TimeUnit.DAYS.toMillis(1),
            TimeUnit.HOURS.toMillis(1),
            TimeUnit.MINUTES.toMillis(1),
            TimeUnit.SECONDS.toMillis(1)
    );

    public static final List<String> timesString = Arrays.asList("год","месяц","день","час","минута","секунда");

    public static String get(String date1) {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date d1 = new Date();
        Date d2 = new Date();

        try {
            d2 = format.parse(date1);
        } catch(Exception e){}

        long mseconds = (d1.getTime()-d2.getTime());
        return toDuration(mseconds);
    }

    public static String toDuration(long duration) {

        StringBuffer res = new StringBuffer();
        for(int i=0;i< TimeAgo.times.size(); i++) {
            Long current = TimeAgo.times.get(i);
            long temp = duration/current;
            if(temp>0) {
                res.append(temp).append(" ").append(decline(temp, TimeAgo.timesString.get(i)) ).append(temp > 1000000 ? "s" : "").append(" назад");
                break;
            }
        }
        if("".equals(res.toString()))
            return "только что";
        else
            return res.toString();
    }

    public static String decline(long numLong, String nominative) {

        // String nominative = null;
        String singular = null;
        String plural = null;

        //"год","месяц","день","час","минита","секунда"

        switch (nominative) {
            case "год":
                singular = "года";
                plural = "лет";
                break;
            case "месяц":
                singular = "месяца";
                plural = "месяцев";
                break;
            case "день":
                singular = "дня";
                plural = "дней";
                break;
            case "час":
                singular = "часа";
                plural = "часов";
                break;
            case "минута":
                singular = "минуты";
                plural = "минут";
                break;
            case "секунда":
                singular = "секунды";
                plural = "секунд";
                break;
        }

        int num = (int)numLong;
        if (num > 10 && ((num % 100) / 10) == 1) {
            return plural;
        }

        switch (num % 10) {
            case 1:
                return nominative;
            case 2:
            case 3:
            case 4:
                return singular;
            default: // case 0, 5-9
                return plural;
        }
    }




    /*public static void main(String args[]) {
        System.out.println(toDuration(123));
        System.out.println(toDuration(1230));
        System.out.println(toDuration(12300));
        System.out.println(toDuration(123000));
        System.out.println(toDuration(1230000));
        System.out.println(toDuration(12300000));
        System.out.println(toDuration(123000000));
        System.out.println(toDuration(1230000000));
        System.out.println(toDuration(12300000000L));
        System.out.println(toDuration(123000000000L));
    }*/
}

