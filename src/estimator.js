const covid19ImpactEstimator = (data) => {
    const input = data;
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
    const computeCurrentlyInfectedForImpact = (input) => input.reportedCases * 10;
    const computeCurrentlyInfectedForSevereImpact = (input) => input.reportedCases * 50;

    //compute InfectionsByRequestedTime for impact and severe impact - challange 1
    const computeInfectionsByRequestedTimeForImpact = (input) => {
        return computeCurrentlyInfectedForImpact(input) * 2 ** Math.trunc(convertToDays(input.timeToElapse, input.periodType) / 3);
    }
    const computeInfectionsByRequestedTimeForSevereImpact = (input) => {
        return computeCurrentlyInfectedForSevereImpact(input) * 2 ** Math.trunc(convertToDays(input.timeToElapse, input.periodType) / 3);
    }

    //compute severeCasesByRequestedTime for impact and severe impact - challange 1
    const computeSevereCasesByRequestedTimeForImpact = (input) => {
        return  Math.trunc(computeInfectionsByRequestedTimeForImpact(input) * 0.15);
    }
    const computeSevereCasesByRequestedTimeForSevereImpact = (input) => {
        return  Math.trunc(computeInfectionsByRequestedTimeForSevereImpact(input) * 0.15);
    }

    return {
        input,
        impact: {
            currentlyInfected: computeCurrentlyInfectedForImpact(input),
            infectionsByRequestedTime: computeInfectionsByRequestedTimeForImpact(input),
            severeCasesByRequestedTime: computeSevereCasesByRequestedTimeForImpact(input)
        },
        severeImpact: {
            currentlyInfected: computeCurrentlyInfectedForSevereImpact(input),
            infectionsByRequestedTime: computeInfectionsByRequestedTimeForSevereImpact(input),
            severeCasesByRequestedTime: computeSevereCasesByRequestedTimeForSevereImpact(input)
        }
    }
};

export default covid19ImpactEstimator;
