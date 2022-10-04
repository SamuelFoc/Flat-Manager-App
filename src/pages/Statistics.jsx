import AverageExpenses from "../components/statistics/components/AverageExpenses";
import AverageConsumption from "../components/statistics/components/AverageConsumption";
import Predictions from "../components/statistics/components/Predictions";
// TODO: CSS
import "./styles/Statistics.css";

const Statistics = () => {
  return (
    <div className="text-light statisticsPageBox">
      <div className="avgCons">
        <AverageConsumption />
      </div>
      <div className="avgExps">
        <AverageExpenses />
      </div>
      <div className="predictions">
        <Predictions />
      </div>
    </div>
  );
};

export default Statistics;
