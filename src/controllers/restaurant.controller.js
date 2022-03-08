const { parse } = require('csv-parse');
const https = require('https');
const db = require("../models");
const Restaurant = db.restaurant;
const RestaurantDay = db.restaurant_day;
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const parseRestaurantData = (req, res) => {
    const filePath = "https://gist.githubusercontent.com/seahyc/7ee4da8a3fb75a13739bdf5549172b1f/raw/f1c3084250b1cb263198e433ae36ba8d7a0d9ea9/hours.csv";
    var csvData = [];
    https.get(filePath,
        (stream) => {
            stream.pipe(parse())
                .on('data',
                    function (csvrow) {
                        let row = {
                            name: csvrow[0],
                            opening_periods: [],
                        };
                        const diffTimes = csvrow[1].toString().split(" / ");

                        diffTimes.forEach(diffTime => {
                            var openingPeriod = {
                                time_from: '',
                                time_to: '',
                                days: [],
                            };
                            let times = diffTime.toString().split(", ");
                            times.forEach(time => {
                                time = time.replace(' - ', '-');
                                const [first, ...rest] = time.split(' ');
                                let firstElem = first.split('-');
                                for (let i = 0; i < firstElem.length; i++) {
                                    firstElem[i] = cleanupDay(firstElem[i])
                                }
                                if (firstElem.length > 1) {
                                    openingPeriod.days = getContinousDays(firstElem[0], firstElem[1]);
                                }
                                else {
                                    firstElem.forEach(elem => {
                                        openingPeriod.days.push(elem);
                                    })
                                }
                                let timeArray = rest.join(' ').split("-");
                                if (timeArray.length > 1) {
                                    openingPeriod.time_from = tConvert(timeArray[0].toString().trim());
                                    openingPeriod.time_to = tConvert(timeArray[1].toString().trim());
                                }
                            });
                            row.opening_periods.push(openingPeriod);
                        });

                        csvData.push(row);
                    }
                )
                .on('end',
                    function () {
                        var days = [];
                        let promises = [];
                        csvData.forEach(data => {
                            promises.push(
                                Restaurant.create({
                                    name: data.name
                                }).then(restaurant => {
                                    data.opening_periods.forEach(period => {
                                        period.days.forEach(basicDay => {
                                            var day = {
                                                restaurant_id: restaurant.id,
                                                time_from: period.time_from,
                                                time_to: period.time_to,
                                                day: basicDay
                                            };
                                            days.push(day);
                                        })
                                    })
                                })
                            );
                        });
                        Promise.all(promises).then((result) => {
                            RestaurantDay.bulkCreate(days).catch(err => {
                                console.log(err);
                            });
                            res.status(200).json(days);
                        }).catch(error => {
                            res.sendStatus(500);
                            res.end();
                        });
                    }
                );
        }
    );
}

function cleanupDay(day) {
    for (let i = 0; i < weekDays.length; i++) {
        if (weekDays[i].toLocaleLowerCase().match(day.toLocaleLowerCase())) {
            return weekDays[i];
        }
    }
}

function getContinousDays(dayFrom, dayTo) {
    let days = [];
    const fromIndex = weekDays.indexOf(dayFrom);
    const toIndex = weekDays.indexOf(dayTo);
    for (let i = fromIndex; i <= toIndex; i++) {
        days.push(weekDays[i]);
    }
    return days;
}

function tConvert(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM' || modifier === 'pm') {
        hours = parseInt(hours, 10) + 12;
    }
    if (!minutes) {
        minutes = 0;
    }

    return `${hours}:${minutes}`;
}

const allRestaurants = (req, res) => {
    Restaurant.findAll().then(restaurants => {
        res.status(200).json(restaurants);
    }).catch(err => {
        res.setStatus(500);
        res.end();
    })
};


module.exports = {
    parseRestaurantData,
    allRestaurants
}