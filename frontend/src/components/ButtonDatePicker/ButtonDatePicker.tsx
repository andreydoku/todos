//from https://mui.com/x/react-date-pickers/custom-field/

import * as React from 'react';
import { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { UseDateFieldProps } from '@mui/x-date-pickers/DateField';
import {
	BaseSingleInputFieldProps,
	DateValidationError,
	FieldSection,
} from '@mui/x-date-pickers/models';
import { FaCalendarDay } from "react-icons/fa6";

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

	// return (
	// 	<Button
	// 		variant="outlined"
	// 		id={id}
	// 		disabled={disabled}
	// 		ref={ref}
	// 		aria-label={ariaLabel}
	// 		onClick={() => setOpen?.((prev) => !prev)}
	// 	>
	// 		{label ? `Current date: ${label}` : 'Pick a date'}
	// 	</Button>
	// );
	return (
		<div className='date-label'
			id={id}
			ref={ref}
			aria-label={ariaLabel}
			onClick={() => setOpen?.((prev) => !prev)}
		>
			{label ? label : <FaCalendarDay />}
		</div>
	);
}

export default function ButtonDatePicker(
	props: Omit<DatePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'>,
) {
	const [open, setOpen] = React.useState(false);

	return (
		<DatePicker
			slots={{ ...props.slots, field: ButtonField }}
			slotProps={{ ...props.slotProps, field: { setOpen } as any }}
			{...props}
			open={open}
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
		/>
	);
}


