import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useWebApp from '@/hooks/useWebApp'

function Page() {
    const router = useRouter()
    const { args, actionId } = router.query
    const webApp = useWebApp();

    const [inputs, setInputs] = useState({})
    const [inputsValues, setInputsValues] = useState({})
    useEffect(() => {
        if (args) {
            let lt = JSON.parse(decodeURIComponent(args))
            setInputs(lt)
        }
    }, [args])

    useEffect(() => {
        window.Telegram.WebApp.MainButton.show();
        window.Telegram.WebApp.MainButton.setText("Отправить");
        window.Telegram.WebApp.MainButton.enable();
        window.Telegram.WebApp.onEvent("mainButtonClicked", () => {
            window.Telegram.WebApp.MainButton.hide();
            window.Telegram.WebApp.sendData(JSON.stringify(
                {
                    actionId: actionId,
                    arguments: inputsValues
                }
            ))
            window.Telegram.WebApp.close();
        })
    }, [actionId, inputsValues])

    function insertValue(key, value) {
        setInputsValues({
            ...inputsValues,
            [key]: value
        })
    }

    useEffect(() => {
        console.log(inputsValues)
    }, [inputsValues])


    return (
        <div className='flex flex-col gap-5 items-center'>
            {
                inputs &&
                Object.keys(inputs).map((item, index) => {
                    return (
                        <div key={index} className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">{item}</span>
                            </label>
                            <input type="text" placeholder="Введите значение" onChange={(e) => insertValue(item, e.target.value)} className="mt-1 input input-bordered w-full max-w-xs" />
                            <p className='mt-1 text-sm'>
                                {inputs[item].description}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Page