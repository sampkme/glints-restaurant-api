const { parse } = require('csv-parse');
const https = require('https');
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
                                let timeArray = rest.join(' ').split(" - ");
                                openingPeriod.time_from = timeArray[0];
                                openingPeriod.time_to = timeArray[1];
                            });
                            row.opening_periods.push(openingPeriod);
                        });

                        csvData.push(row);
                    }
                )
                .on('end',
                    function () {
                        res.status(200).json(csvData);
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


module.exports = {
    parseRestaurantData
}