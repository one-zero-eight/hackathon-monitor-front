import MainButton from "@/components/MainButton";
import fetcher from "@/hooks/fetcher";
import useWebApp from "@/hooks/useWebApp";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

function Page() {
  const webApp = useWebApp();
  const router = useRouter();
  const { action, target } = router.query;
  const { data: actionData } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/actions/${action}`, webApp?.initData],
    ([url, auth]) => fetcher(url, auth),
  );
  const [inputsValues, setInputsValues] = useState<{ [key: string]: any }>({});

  const chooseInputType = (type: string) => {
    switch (type) {
      case "str":
        return "text";
      case "int":
        return "number";
      default:
        return "text";
    }
  };

  const convertInputValue = (type: string, value: string) => {
    switch (type) {
      case "str":
        return value;
      case "int":
        return parseInt(value, 10);
      default:
        return value;
    }
  };

  const complete = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/actions/execute/${action}?target_alias=${target}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            webApp?.initData || process.env.NEXT_PUBLIC_AUTH_STRING
          }`,
        },
        body: JSON.stringify(inputsValues),
      },
    )
      .then((res) => res.text())
      .catch((e) => console.error(e));
    console.log(data);
    if (webApp) {
      webApp.showPopup({
        title: "Запрос выполнен",
        message: `Ответ сервера: ${data}`,
        buttons: [{ text: "Закрыть", type: "close" }],
      });
      webApp.onEvent("popupClosed", () => {
        webApp.close();
      });
    }
  };

  return (
    <div>
      <h1 className="mt-2 text-xl">База данных: {target}</h1>
      {actionData === undefined ? (
        <>Загрузка...</>
      ) : (
        <div className="space-y-2">
          <h1 className="text-xl">Сценарий: {actionData.title}</h1>
          <p className="">{actionData.description}</p>
          {Object.entries(actionData.arguments).map(
            ([key, item]: [string, any]) => (
              <div key={key} className="space-y-2">
                <label className="text-lg font-semibold text-gray-400">
                  {key}{" "}
                  <span className="text-sm text-gray-500">
                    {item.description}
                  </span>
                </label>
                <input
                  value={inputsValues[item]}
                  onChange={(e) =>
                    setInputsValues((v) => ({
                      ...v,
                      [key]: convertInputValue(item.type, e.target.value),
                    }))
                  }
                  type={chooseInputType(item.type)}
                  placeholder="Введите значение"
                  className="input input-bordered w-full"
                />
              </div>
            ),
          )}

          <MainButton text="Выполнить сценарий" onClick={complete} />
        </div>
      )}
    </div>
  );
}

export default Page;
