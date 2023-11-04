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
        window.Telegram.WebApp.MainButton.setText("Запустить");
        window.Telegram.WebApp.MainButton.enable();
        const handleClick = () => {
            window.Telegram.WebApp.MainButton.hide();
            window.Telegram.WebApp.sendData(JSON.stringify(
                {
                    actionId: actionId,
                    arguments: inputsValues
                }
            ))
            window.Telegram.WebApp.close();
        }
        window.Telegram.WebApp.onEvent("mainButtonClicked", handleClick)
        return () => {
            window.Telegram.WebApp.offEvent("mainButtonClicked", handleClick)
        }
    }, [actionId, inputsValues])

    function insertValue(key, value) {
        setInputsValues({
            ...inputsValues,
            [key]: value
        })
    }
    const chooseType = (type) => {
        switch (type) {
            case 'str':
                return 'text'
                break;
            case 'int':
                return 'number'
                break;
        }
    }

    const convertType = (type, value) => {
        switch (type) {
            case 'str':
                return value
                break;
            case 'int':
                return parseInt(value)
                break;
        }
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
                            <input type={chooseType(inputs[item].type)} placeholder="Введите значение" onChange={(e) => insertValue(item, convertType(inputs[item].type, e.target.value))} className="mt-1 input input-bordered w-full max-w-xs" />
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