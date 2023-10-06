'use client'

import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  label: string, // LABEL OF TYPE STRING!
  id: string, // ID OF TYPE STRING!
  type?: string, // TYPE OF TYPE STRING!
  require?: boolean, // REQUIRED OF TYPE BOOLEAN!
  register: UseFormRegister<FieldValues>, // TYPE HOOK HAVING PARAMS OF TYPE FIELD VALUES FROM USE-HOOK-FORM!
  errors: FieldErrors, // ERRORS OF TYPE FIELD ERRORS FROM USE-HOOK-FORM!
  disabled?: boolean // DISABLED OF TYPE BOOLEAN!
}

export default function Input ({
  label,
  id,
  type,
  require,
  register,
  errors,
  disabled
}: Props) {
  return (
    <>
      <div>
        {/* LABEL */}
        <label
          className='block text-sm font-medium leading-6 text-gray-900'
          htmlFor={id}
        >
          {label}
        </label>
        <div className='mt-2'>
          <input
            id={id}
            type={type}
            // placeholder={placeholder}
            autoComplete={id}
            disabled={disabled}
            {...register(id, { required: require })}
            className={clsx(
              `
                form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6
            `,
              errors[id] && 'focus:ring-rose-600',
              disabled && 'opacity-50 cursor-default'
            )}
          />
        </div>
      </div>
    </>
  )
}
