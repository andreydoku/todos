//from https://mui.com/x/react-date-pickers/custom-field/

import { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import { BaseSingleInputFieldProps, DateValidationError, FieldSection } from '@mui/x-date-pickers/models';
import { FaCalendarDay } from "react-icons/fa6";
import { useState } from 'react';


export default function ButtonDatePicker(
	props: Omit<DatePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'>,
) {
	const [open, setOpen] = useState(false);

	return (
		<DatePicker
			slots={{ ...props.slots, field: ButtonField }}
			slotProps={{ ...props.slotProps, field: { setOpen } as any, actionBar: {
				actions: ['clear']
			  } } }
			{...props}
			open={open}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
		/>
	);
}


interface ButtonFieldProps
	extends UseDateFieldProps<Dayjs, false>,
	BaseSingleInputFieldProps<
		Dayjs | null,
		Dayjs,
		FieldSection,
		false,
		DateValidationError
	> {
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ButtonField(props: ButtonFieldProps) {
	const {
		setOpen,
		label,
		id,
		InputProps: { ref } = {},
		inputProps: { 'aria-label': ariaLabel } = {},
	} = props;

	let cn = "date-picker-button";
	
	
	return (
		<div className={cn}
			id={id}
			ref={ref}
			aria-label={ariaLabel}
			onClick={() => setOpen?.((prev) => !prev)}
		>
			{label ? label : <FaCalendarDay className='calendar-icon' />}
		</div>
	);
}




