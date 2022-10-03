import BarChart from "../components/statistics/BarChart";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import "../styles/Statistics.css";

const Statistics = () => {
  const [loading, setLoading] = useState(false);
  const [gas, setGas] = useState();
  const [water, setWater] = useState();
  const [elec, setElec] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/admin/energies")
      .then((res) => {
        setGas({
          labels: res.data.data?.gas?.map((record) =>
            new Date(record.measured_at)?.toLocaleDateString("en-GB")
          ),
          data: res.data.data?.gas?.map((record) => record.measured_value),
        });

        setWater({
          labels: res.data.data?.water?.map((record) =>
            new Date(record.measured_at)?.toLocaleDateString("en-GB")
          ),
          data: res.data.data?.water?.map((record) => record.measured_value),
        });

        setElec({
          labels: res.data.data?.electricity?.map((record) =>
            new Date(record.measured_at)?.toLocaleDateString("en-GB")
          ),
          data: res.data.data?.electricity?.map(
            (record) => record.measured_value
          ),
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [axiosPrivate]);

  const gasData = {
    labels: gas?.labels,
    datasets: [
      {
        label: "Gas consumption",
        data: gas?.data,
        backgroundColor: "#26D2A6",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 3,
      },
    ],
  };
  const waterData = {
    labels: water?.labels,
    datasets: [
      {
        label: "Water consumption",
        data: water?.data,
        backgroundColor: "#2680D2",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 3,
      },
    ],
  };
  const elecData = {
    labels: elec?.labels,
    datasets: [
      {
        label: "Electricity consumption",
        data: elec?.data,
        backgroundColor: "#C5D226",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 3,
      },
    ],
  };

  return (
    <div className="text-light">
      <h1>Charts</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="chartContainer">
          <BarChart chartData={gasData} />
          <BarChart chartData={waterData} />
          <BarChart chartData={elecData} />
        </div>
      )}
    </div>
  );
};

export default Statistics;
