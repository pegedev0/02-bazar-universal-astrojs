import { useState } from "react"

export default function SearchForm ({ withBtn = true, customPlaceholder }) {
    const [ key, setKey ] = useState() 

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (key !== undefined) {
            window.location.href = `/items?search=${key}`
        }
    }

    const handleChange = (evt) => {
        setKey(evt.target.value)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex flex-row mb-5">
                <input 
                    onChange={handleChange}
                    className="bg-neutral-300 py-2 px-2 w-60" 
                    type="text" 
                    placeholder={customPlaceholder ? customPlaceholder : "laptops, smartphones, ..."} 
                    maxLength="20"
                />
                <div className="-ml-10 mt-2">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="gray"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        ><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path
                            d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path><path
                            d="M21 21l-6 -6"></path></svg
                    >
                </div>
            </div>

            {
                withBtn 
                    ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded-2xl transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 w-32">
                        Buscar
                    </button>
                    : null
            }
            
		</form>
    )
}