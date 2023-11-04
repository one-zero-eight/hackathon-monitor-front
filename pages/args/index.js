import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useWebApp from '@/hooks/useWebApp'

function Page() {
    const router = useRouter()
    const { json } = router.query
    const webApp = useWebApp();
    let params = new URLSearchParams(json);
    params = JSON.parse(params.get("params"))
    const [data, setData] = useState({
        "pid": {
            "type": "number",
            "description": "Идентификатор процесса"
        },
        "name": {
            "type": "string",
            "description": "Имя процесса"
        },
    })

    function toggleVisibleMainButton() {
        window.Telegram.WebApp.MainButton.show();
        window.Telegram.WebApp.MainButton.setText("Показать график");
        window.Telegram.WebApp.MainButton.enable();
    }
    return (
        <div className='flex flex-col gap-5'>
            {
                data &&
                Object.keys(data).map((item, index) => {
                    return (
                        <div key={index} className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">{item}</span>
                            </label>
                            <input type="text" placeholder="Введите значение" className="mt-1 input input-bordered w-full max-w-xs" />
                            <p className='mt-1 text-sm'>
                                {data[item].description}
                            </p>
                        </div>
                    )
                })
            }
            <button onClick={toggleVisibleMainButton} className="btn">Показать график</button>
        </div>
    )
}

export default Page