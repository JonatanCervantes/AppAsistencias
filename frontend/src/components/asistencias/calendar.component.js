import { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import es from 'date-fns/locale/es';

export function Calendar(props) {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(props.value);
    const handleChange = (date, event) => {
        setFechaSeleccionada(date);
        props.onChange(date);
    }

    //useEffect(handleChange(props.value, null), [props.value]);

    return (
        <DatePicker
            selected={fechaSeleccionada}
            onChange={(date, e) => handleChange(date, e)}
            locale={es}
            showTimeSelect
            timeFormat='p'
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy h:mm aa"
            name="fecha"
        />
    );
};