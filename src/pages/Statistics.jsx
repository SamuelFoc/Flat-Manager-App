import AverageExpenses from "../components/statistics/components/AverageExpenses";
import AverageConsumption from "../components/statistics/components/AverageConsumption";
import Predictions from "../components/statistics/components/Predictions";
import Summary from "../components/statistics/components/Summary";

// TODO: CSS
import "./styles/Statistics.css";
import { useState } from "react";

const Statistics = () => {
  const [summaryHidden, setSummaryHidden] = useState(true);

  const showSummary = () => {
    setSummaryHidden((prevState) => !prevState);
  };

  return (
    <div className="text-light statisticsPageBox">
      <div className="avgCons">
        <AverageConsumption />
      </div>
      <div className="avgExps">
        <AverageExpenses />
      </div>
      <div className="predictions mb-4">
        <Predictions />
      </div>
      <div className="summary">
        <button
          className={
            summaryHidden
              ? "btn btn-outline-success summaryMainButton"
              : "hidden"
          }
          onClick={showSummary}
        >
          Generate Summary
        </button>
        <div
          className={summaryHidden ? "hidden" : "summaryCloseButton"}
          onClick={showSummary}
        >
          x
        </div>
        {summaryHidden ? "" : <Summary />}
      </div>
    </div>
  );
};

export default Statistics;
