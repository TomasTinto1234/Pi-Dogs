import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, getDogsByTemp } from "../actions";

export function FilterByTemperaments(){
    const dispatch = useDispatch()
    const temmp = useSelector((state) => state.temperament)

    function handleChange(e) {
        dispatch(getDogsByTemp(e.taget.value))
    }

    useEffect(()=> {
        dispatch(getTemperaments())
    },[dispatch])

    return (
        <div>
            <select onChange={(e)=>handleChange(e)}>
                <option hidden={true}>
                 Temperamentos
                </option>
                {temmp.map((e)=> (
                    <option key={e.id}>{e.name}</option>
                ))}
            </select>
        </div>
    )
}

