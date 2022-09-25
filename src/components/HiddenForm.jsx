import "./HiddenForm.css";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function HiddenForm(props) {
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    var data = JSON.stringify(props.formInfo.submit.data);
    console.log(props.formInfo.submit.data);
    var config = {
      method: props.formInfo.submit.method,
      url: props.formInfo.submit.url,
      data: data,
    };

    axiosPrivate(config)
      .then((res) => {
        props.showForm(false);
        props.whatChanged(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="afterElementForm">
      <form>
        {/* INPUTS */}
        {props.formInfo.inputs.map((input, i) => {
          return (
            <input
              key={i}
              className="form-control my-2"
              onChange={props.handleChange}
              type="text"
              name={input}
              placeholder={input[0].toUpperCase() + input.slice(1)}
            />
          );
        })}

        {/* DATES */}
        {props.formInfo.dates.map((input, i) => {
          return (
            <div key={i} className="text-light">
              <label htmlFor={input}>
                {input[0].toUpperCase() + input.slice(1)}
              </label>
              <input
                className="form-control mb-2"
                onChange={props.handleChange}
                type="date"
                name={input}
                id={input}
              />
            </div>
          );
        })}

        {/* SELECTIONS */}
        {props.formInfo.selections.map((selection, i) => {
          return (
            <select
              key={i}
              className="form-select my-2"
              name={selection.name}
              onChange={props.handleChange}
            >
              <option defaultValue value={"LOW"}>
                {selection.name[0].toUpperCase() + selection.name.slice(1)}
              </option>

              {selection.options.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          );
        })}

        <div>
          <button
            className="btn btn-primary m-4 px-4"
            type="submit"
            onClick={handleSubmit}
          >
            {props.formInfo.submitName}
          </button>
          <button className="btn btn-danger m-4 px-4" onClick={props.showForm}>
            BACK
          </button>
        </div>
      </form>
    </div>
  );
}

export default HiddenForm;
