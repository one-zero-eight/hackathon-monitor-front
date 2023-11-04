import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { useEffect, useState } from "react";
import useTelegramInitData from "@/hooks/useTelegramInitData";
import useWebApp from "@/hooks/useWebApp";

// import { Datepicker } from 'flowbite-react';
import DateRangePicker from 'rsuite/DateRangePicker';
import PrometheusChart from "@/components/prometheusChart";

import ResizableTable from "@/components/gridTable"


function Home() {
  const webApp = useWebApp();
  const telegramInitData = useTelegramInitData();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatepicker, setShowDatepicker] = useState(false);

  useEffect(() => {
    console.log(webApp)
  }, [webApp])

  useEffect(() => {
    if (webApp) {
      console.log(webApp);
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.setText("Показать график");
      window.Telegram.WebApp.MainButton.enable();
    }
  }, [])

  useEffect(() => {
    console.log(startDate)
  }, [startDate])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="">
        {/* <div>
          <p>From</p>
          <Datepicker onChange={() => console.log("tt")} maxDate={new Date()} />
        </div>

        <div>
          <p>To</p>
          <Datepicker maxDate={new Date()} />
        </div> */}
        <p>Date Time Range</p>
        <DateRangePicker
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="Выберите дату и время"
          showOneCalendar
          character=" | "
          onChange={(value) => {
            console.log(value);
            setStartDate(value[0]);
            setEndDate(value[1]);
          }
          }
          defaultCalendarValue={[new Date('2023-11-01 00:00:00'), new Date('2022-1-03 23:59:59')]}
        />
      </div>

      {/* <div>
        <PrometheusChart data={PrometheusData.data.result} />
      </div> */}



    </main>
  );
}

export default Home;
