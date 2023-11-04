import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useWebApp from '@/hooks/useWebApp';

function Page() {
    const router = useRouter();
    const { args, actionId } = router.query;
    const webApp = useWebApp();

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
            window.Telegram.WebApp.sendData(JSON.stringify({
                actionId: actionId,
                arguments: inputsValues,
            }));
            window.Telegram.WebApp.close();
        }

        window.Telegram.WebApp.onEvent("mainButtonClicked", handleClick);

        return () => {
            window.Telegram.WebApp.offEvent("mainButtonClicked", handleClick);
        }
    }, [actionId, inputsValues]);

    const insertValue = (key, value) => {
        setInputsValues({
            ...inputsValues,
            [key]: value,
        });
    }

    const chooseInputType = (type) => {
        switch (type) {
            case 'str':
                return 'text';
            case 'int':
                return 'number';
            default:
                return 'text';
        }
    }

    const convertInputValue = (type, value) => {
        switch (type) {
            case 'str':
                return value;
            case 'int':
                return parseInt(value, 10);
            default:
                return value;
        }
    }

    useEffect(() => {
        console.log(inputsValues);
    }, [inputsValues]);

    return (
        <div className='flex flex-col gap-5 items-center'>
            {inputs &&
                Object.keys(inputs).map((item, index) => (
                    <div key={index} className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">{item}</span>
                        </label>
                        <input
                            type={chooseInputType(inputs[item].type)}
                            placeholder="Введите значение"
                            onChange={(e) =>
                                insertValue(item, convertInputValue(inputs[item].type, e.target.value))
                            }
                            className="mt-1 input input-bordered w-full max-w-xs"
                        />
                        <p className='mt-1 text-sm'>{inputs[item].description}</p>
                    </div>
                ))}
        </div>
    );
}

export default Page;
