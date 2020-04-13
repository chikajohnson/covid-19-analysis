/* eslint-disable max-len */
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

  //    convert timeToElapse to days
  const convertToDays = (timeToElapse, type) => {
    let timeToElapseInDays = 0;
    switch (type) {
      case 'days':
        timeToElapseInDays = timeToElapse;
        break;
      case 'weeks':
        timeToElapseInDays = timeToElapse * 7;
        break;
      case 'months':
        timeToElapseInDays = timeToElapse * 30;
        break;
      default:
        timeToElapseInDays = timeToElapse;
    }
    return timeToElapseInDays;
  };

  const impact = (input) => {
    const infected = input.reportedCases * 10;
    const infectedByReqTime = infected * 2 ** Math.trunc(convertToDays(input.timeToElapse, input.periodType) / 3);
    const severeByReqTime = Math.trunc(infectedByReqTime * 0.15);
    const hospitalBeds = Math.trunc((input.totalHospitalBeds * 0.35) - severeByReqTime);
    const icuByReqTime = Math.floor(infectedByReqTime * 0.05);
    const ventilatorsByReqTime = Math.flooq(infectedByReqTime * 0.02);
    const incomePerPopulation = input.region.avgDailyIncomePopulation;
    const AvgDailyIcome = input.region.avgDailyIncomeInUSD;
    const dollarsInFlight = Math.trunc((infectedByReqTime * incomePerPopulation * AvgDailyIcome) / 30);
    return {
      currentlyInfected: infected,
      infectionsByRequestedTime: infectedByReqTime,
      severeCasesByRequestedTime: severeByReqTime,
      hospitalBedsByRequestedTime: hospitalBeds,
      dollarsInFlight,
      casesForICUByRequestedTime: icuByReqTime,
      casesForVentilatorsByRequestedTime: ventilatorsByReqTime
    };
  };

  const severeImpact = (input) => {
    const infected = input.reportedCases * 50;
    const infectedByReqTime = infected * 2 ** Math.trunc(convertToDays(input.timeToElapse, input.periodType) / 3);
    const severeByReqTime = Math.trunc(infectedByReqTime * 0.15);
    const hospitalBeds = Math.trunc((input.totalHospitalBeds * 0.35) - severeByReqTime);
    const icuByReqTime = Math.floor(infectedByReqTime * 0.05);
    const ventilatorsByReqTime = Math.floor(infectedByReqTime * 0.02);
    const incomePerPopulation = input.region.avgDailyIncomePopulation;
    const AvgDailyIcome = input.region.avgDailyIncomeInUSD;
    const dollarsInFlight = Math.trunc((infectedByReqTime * incomePerPopulation * AvgDailyIcome) / 30);
    return {
      currentlyInfected: infected,
      infectionsByRequestedTime: infectedByReqTime,
      severeCasesByRequestedTime: severeByReqTime,
      hospitalBedsByRequestedTime: hospitalBeds,
      dollarsInFlight,
      casesForICUByRequestedTime: icuByReqTime,
      casesForVentilatorsByRequestedTime: ventilatorsByReqTime
    };
  };

  const input = data;
  return {
    data,
    impact: impact(input),
    severeImpact: severeImpact(input)
  };
};

export default covid19ImpactEstimator;
