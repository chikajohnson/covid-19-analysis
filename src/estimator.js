/* eslint-disable max-len */
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

  //    compute currectly infected for impact and severe impact - challange 1
  const computeCurrentlyInfectedForImpact = (inputData) => inputData.reportedCases * 10;
  const computeCurrentlyInfectedForSevereImpact = (inputData) => inputData.reportedCases * 50;

  //    compute InfectionsByRequestedTime for impact and severe impact - challange 1
  const computeInfectionsByRequestedTimeForImpact = (inputData) => computeCurrentlyInfectedForImpact(inputData)
      * 2 ** Math.trunc(convertToDays(inputData.timeToElapse, inputData.periodType) / 3);
  const computeInfectionsByRequestedTimeForSevereImpact = (inputData) => (
    computeCurrentlyInfectedForSevereImpact(inputData)
      * 2 ** Math.trunc(convertToDays(inputData.timeToElapse, inputData.periodType) / 3)
  );

  // compute severeCasesByRequestedTime for impact and severe impact - challange 1
  const computeSevereCasesByRequestedTimeForImpact = (inputData) => Math.trunc(computeInfectionsByRequestedTimeForImpact(inputData) * 0.15);
  const computeSevereCasesByRequestedTimeForSevereImpact = (inputData) => Math.trunc(
    computeInfectionsByRequestedTimeForSevereImpact(inputData) * 0.15
  );

  // compute hospitalBedsByRequestedTime for impact and severe impact - challange  2
  const computeHospitalBedsByRequestedTimeForImpact = (inputData) => {
    const hospitalBeds = inputData.totalHospitalBeds * 0.35;
    return Math.trunc(hospitalBeds - computeSevereCasesByRequestedTimeForImpact(inputData));
  };
  const computeHospitalBedsByRequestedTimeForSevereImpact = (inputData) => {
    const hospitalBeds = inputData.totalHospitalBeds * 0.35;
    return Math.trunc(hospitalBeds - computeSevereCasesByRequestedTimeForSevereImpact(inputData));
  };

  // compute casesForVentilatorsByRequestedTime for impact and severe impact - challange  2
  // const computeCasesForVentilatorsForImpact = (inputData) => computeInfectionsByRequestedTimeForImpact(inputData) * 0.05;
  // const computeCasesForVentilatorsForImpactForSevereImpact = (inputData) => computeInfectionsByRequestedTimeForSevereImpact(inputData) * 0.05;

  // compute casesForICUByRequestedTime for impact and severe impact - challange  3
  const computeCasesForICUByRequestedTimeForImpact = (inputData) => Math.trunc(computeCurrentlyInfectedForImpact(inputData) * 0.05);
  const computeCasesForICUByRequestedTimeForSevere = (inputData) => Math.trunc(computeCurrentlyInfectedForSevereImpact(inputData) * 0.05);

  // compute casesForVentilatorsByRequestedTime for impact and severe impact - challange  3
  const computeCasesForVentilatorsByRequestedTimeForImpact = (inputData) => Math.trunc(computeInfectionsByRequestedTimeForImpact(inputData) * 0.02);
  const computeCasesForVentilatorsByRequestedTimeForSevere = (inputData) => Math.trunc(computeInfectionsByRequestedTimeForImpact(inputData) * 0.02);

  // compute dollarsInFlight for impact and severe impact - challange 3
  const computeDollarsInFlightForImpact = (inputData) => {
    const incomePerPopulation = inputData.region.avgDailyIncomePopulation;
    const AvgDailyIcome = inputData.region.avgDailyIncomeInUSD;
    return Math.trunc((computeInfectionsByRequestedTimeForImpact(inputData) * incomePerPopulation * AvgDailyIcome) / 30);
  };
  const computeDollarsInFlightForSevereImpact = (inputData) => {
    const incomePerPopulation = inputData.region.avgDailyIncomePopulation;
    const AvgDailyIcome = inputData.region.avgDailyIncomeInUSD;
    return Math.trunc((computeInfectionsByRequestedTimeForSevereImpact(inputData) * incomePerPopulation * AvgDailyIcome) / 30);
  };

  return {
    input,
    impact: {
      currentlyInfected: computeCurrentlyInfectedForImpact(input),
      infectionsByRequestedTime: computeInfectionsByRequestedTimeForImpact(input),
      severeCasesByRequestedTime: computeSevereCasesByRequestedTimeForImpact(input),
      hospitalBedsByRequestedTime: computeHospitalBedsByRequestedTimeForImpact(data),
      //   casesForVentilatorsByRequestedTime: computeCasesForVentilatorsForImpact(data),
      dollarsInFlight: computeDollarsInFlightForImpact(data),
      casesForICUByRequestedTime: computeCasesForICUByRequestedTimeForImpact(data),
      casesForVentilatorsByRequestedTime: computeCasesForVentilatorsByRequestedTimeForImpact(data)
    },
    severeImpact: {
      currentlyInfected: computeCurrentlyInfectedForSevereImpact(input),
      infectionsByRequestedTime: computeInfectionsByRequestedTimeForSevereImpact(input),
      severeCasesByRequestedTime: computeSevereCasesByRequestedTimeForSevereImpact(input),
      hospitalBedsByRequestedTime: computeHospitalBedsByRequestedTimeForSevereImpact(data),
      // casesForVentilatorsByRequestedTime: computeCasesForVentilatorsForImpactForSevereImpact(data),
      dollarsInFlight: computeDollarsInFlightForSevereImpact(data),
      casesForICUByRequestedTime: computeCasesForICUByRequestedTimeForSevere(data),
      casesForVentilatorsByRequestedTime: computeCasesForVentilatorsByRequestedTimeForSevere(data)
    }
  };
};

export default covid19ImpactEstimator;
