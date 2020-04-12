const covid19ImpactEstimator = (data) => {
     /* sample input data
    {
        region: {
        name: "Africa",
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
        },
        periodType: "days",
        timeToElapse: 58,
        reportedCases: 674,
        population: 66622705,
        totalHospitalBeds:1380614
    }
    */

    //convert timeToElapse to days
    const convertToDays = (timeToElapse, type) => {
        let timeToElapseInDays = 0;
        switch (type) {
            case "days":
                timeToElapseInDays = timeToElapse;
                break;
            case "weeks":
                timeToElapseInDays = timeToElapse * 7;
                break;
            case "months":
                timeToElapseInDays = timeToElapse * 30;
                break;
            default:
                timeToElapseInDays = timeToElapse;
        }
        return timeToElapseInDays;
    }

    //compute currectly infected for impact and severe impact - challange 1
    const computeCurrentlyInfectedForImpact = (data) => data.reportedCases * 10;
    const computeCurrentlyInfectedForSevereImpact = (data) => data.reportedCases * 50;

    //compute InfectionsByRequestedTime for impact and severe impact - challange 1
    const computeInfectionsByRequestedTimeForImpact = (data) => {
        return computeCurrentlyInfectedForImpact(data) * 2 ** Math.trunc(convertToDays(data.timeToElapse, data.periodType) / 3);
    }
    const computeInfectionsByRequestedTimeForSevereImpact = (data) => {
        return computeCurrentlyInfectedForSevereImpact(data) * 2 ** Math.trunc(convertToDays(data.timeToElapse, data.periodType) / 3);
    }

    //compute severeCasesByRequestedTime for impact and severe impact - challange 1
    const computeSevereCasesByRequestedTimeForImpact = (data) => {
        return  Math.trunc(computeInfectionsByRequestedTimeForImpact(data) * 0.15);
    }
    const computeSevereCasesByRequestedTimeForSevereImpact = (data) => {
        return  Math.trunc(computeInfectionsByRequestedTimeForSevereImpact(data) * 0.15);
    }

    return {
        data,
        impact: {
            currentlyInfected: computeCurrentlyInfectedForImpact(data),
            infectionsByRequestedTime: computeInfectionsByRequestedTimeForImpact(data),
            severeCasesByRequestedTime: computeSevereCasesByRequestedTimeForImpact(data)
        },
        severeImpact: {
            currentlyInfected: computeCurrentlyInfectedForSevereImpact(data),
            infectionsByRequestedTime: computeInfectionsByRequestedTimeForSevereImpact(data),
            severeCasesByRequestedTime: computeSevereCasesByRequestedTimeForSevereImpact(data)
        }
    }
};

export default covid19ImpactEstimator;
