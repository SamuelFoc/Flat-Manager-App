import BarChart from "../charts/BarChart";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AvgCons = () => {
  const [loading, setLoading] = useState(false);
  const [gasAvg, setGasAvg] = useState();
  const [waterAvg, setWaterAvg] = useState();
  const [elecAvg, setElecAvg] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/statistics/averages")
      .then((res) => {
        setGasAvg({
          labels: res.data?.gas?.labels,
          data: res.data?.gas?.avg,
        });

        setWaterAvg({
          labels: res.data?.water?.labels,
          data: res.data?.water?.avg,
        });

        setElecAvg({
          labels: res.data?.electricity?.labels,
          data: res.data?.electricity?.avg,
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  const gasDataAvg = {
    labels: gasAvg?.labels,
    datasets: [
      {
        label: "AVG Gas consumption m3/day",
        data: gasAvg?.data,
        backgroundColor: "#26D2A6",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 3,
      },
    ],
  };
  const waterDataAvg = {
    labels: waterAvg?.labels,
    datasets: [
      {
        label: "AVG Water consumption m3/day",
        data: waterAvg?.data,
        backgroundColor: "#2680D2",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 3,
      },
    ],
  };
  const elecDataAvg = {
    labels: elecAvg?.labels,
    datasets: [
      {
        label: "AVG Electricity consumption kWh/day",
        data: elecAvg?.data,
        backgroundColor: "#C5D226",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 3,
      },
    ],
  };

  return (
    <div className="my-4">
      <h3>Average consumption</h3>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="chartContainer">
          {gasAvg?.data?.length > 0 ? <BarChart chartData={gasDataAvg} /> : ""}
          {waterAvg?.data?.length > 0 ? (
            <BarChart chartData={waterDataAvg} />
          ) : (
            ""
          )}
          {elecAvg?.data?.length > 0 ? (
            <BarChart chartData={elecDataAvg} />
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default AvgCons;
