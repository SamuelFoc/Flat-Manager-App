import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AverageExpenses from "../components/statistics/components/AverageExpenses";
import AverageConsumption from "../components/statistics/components/AverageConsumption";
import Predictions from "../components/statistics/components/Predictions";
import Summary from "../components/statistics/components/Summary";

// TODO: CSS
import "./styles/Statistics.css";

const Statistics = () => {
  const [summaryHidden, setSummaryHidden] = useState(true);
  const [reportType, setReportType] = useState();
  const axiosPrivate = useAxiosPrivate();

  const showSummary = () => {
    setSummaryHidden((prevState) => !prevState);
  };

  const handleChange = (event) => {
    setReportType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axiosPrivate.get(`/statistics/report/${reportType}`);
  };

  return (
    <div className="statisticsMainSection">
      <div className="statisticsPageBox">
        <div className="avgCons">
          <AverageConsumption />
        </div>
        <div className="avgExps">
          <AverageExpenses />
        </div>
        <div className="predictions mb-4">
          <Predictions />
        </div>
      </div>

      <div className="summaryMainContainer mt-5">
        <h3 className="chartTitle mt-3 ps-0">Summary</h3>
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

      <div className="reportsContainer">
        <button className="btn btn-outline-warning" onClick={handleSubmit}>
          Generate report
        </button>
        <select
          className="form-select my-2"
          name="type"
          onChange={handleChange}
        >
          <option defaultValue>Select report type</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Gas">Gas</option>
        </select>
      </div>
    </div>
  );
};

export default Statistics;
