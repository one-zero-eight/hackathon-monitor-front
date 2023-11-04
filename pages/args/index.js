import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const { args, actionId } = router.query;

  const [inputs, setInputs] = useState({});
  const [inputsValues, setInputsValues] = useState({});

  useEffect(() => {
    if (args) {
      const decodedArgs = JSON.parse(decodeURIComponent(args));
      setInputs(decodedArgs);
    }
  }, [args]);

  useEffect(() => {
    window.Telegram.WebApp.MainButton.show();
    window.Telegram.WebApp.MainButton.setText("Запустить");
    window.Telegram.WebApp.MainButton.enable();

    const handleClick = () => {
      window.Telegram.WebApp.MainButton.hide();
      window.Telegram.WebApp.sendData(
        JSON.stringify({
          actionId: actionId,
          arguments: inputsValues,
        }),
      );
      window.Telegram.WebApp.close();
    };

    window.Telegram.WebApp.onEvent("mainButtonClicked", handleClick);

    return () => {
      window.Telegram.WebApp.offEvent("mainButtonClicked", handleClick);
    };
  }, [actionId, inputsValues]);

  const insertValue = (key, value) => {
    setInputsValues({
      ...inputsValues,
      [key]: value,
    });
  };

  const chooseInputType = (type) => {
    switch (type) {
      case "str":
        return "text";
      case "int":
        return "number";
      default:
        return "text";
    }
  };

  const convertInputValue = (type, value) => {
    switch (type) {
      case "str":
        return value;
      case "int":
        return parseInt(value, 10);
      default:
        return value;
    }
  };

  useEffect(() => {
    console.log(inputsValues);
  }, [inputsValues]);

  return (
    <div className="space-y-5">
      {inputs &&
        Object.keys(inputs).map((item, index) => (
          <div key={index} className="space-y-2">
            <label className="text-lg font-semibold text-gray-700">
              {item}
            </label>
            <input
              type={chooseInputType(inputs[item].type)}
              placeholder="Введите значение"
              onChange={(e) =>
                insertValue(
                  item,
                  convertInputValue(inputs[item].type, e.target.value),
                )
              }
              className="input input-bordered w-full"
            />
            <p className="text-sm text-gray-600">{inputs[item].description}</p>
          </div>
        ))}
    </div>
  );
}

export default Page;
