'use client'
import clsx from 'clsx'
import React from 'react'

type Props = {
  type: 'button' | 'submit' | 'reset' | undefined,
  fullWidth?: boolean,
  onClick?: () => void,
  secondary?: boolean,
  danger?: boolean,
  disabled?: boolean,
  children: React.ReactNode
}

export default function Button ({
  children,
  type,
  fullWidth,
  secondary,
  danger,
  disabled,
  onClick
}: Props) {
  return (
    <>
      <button
        className={clsx(
          `flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
          disabled && 'opacity-50 cursor-default',
          fullWidth && 'w-full',
          secondary ? 'text-gray-900' : 'text-white',
          danger &&
            'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-500',
          !danger &&
            !secondary &&
            'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
        )}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  )
}
