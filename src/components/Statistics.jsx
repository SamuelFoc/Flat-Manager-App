import React from "react";
import { Chart } from "react-charts";

const Statistics = (props) => {
  const sortByDate = (energy) => {
    const sortedEnergy = energy?.sort(
      (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
    );
    return sortedEnergy;
  };

  const createData = (data) => {
    return data?.map((item) => {
      const splittedDate = item?.createdAt?.split(/[- T : Z]/);
      const jsDate = new Date(
        Date.UTC(
          splittedDate[0],
          splittedDate[1] - 1,
          splittedDate[2],
          splittedDate[3],
          splittedDate[4],
          splittedDate[5]
        )
      );
      return [jsDate, item.measured_value];
    });
  };

  const sortedWater = sortByDate(props.data?.water);
  //const sortedGas = sortByDate(props.data?.gas);
  //const sortedElectricity = sortByDate(props.data?.electricity);

  const waterData = createData(sortedWater);

  const data = React.useMemo(
    () => [
      {
        label: "Water",
        data: waterData,
      },
    ],
    [waterData]
  );
  console.log(data);

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
      className="text-center"
    >
      <h5>Water consumption</h5>
      {/* <Chart data={data} axes={axes} /> */}
    </div>
  );
};

export default Statistics;
