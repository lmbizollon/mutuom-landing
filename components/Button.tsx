import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'px-8 py-3 rounded-lg font-inter font-semibold text-base transition-all duration-200'

  const variantStyles = {
    primary: 'bg-navy text-white hover:bg-forest',
    secondary: 'bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
