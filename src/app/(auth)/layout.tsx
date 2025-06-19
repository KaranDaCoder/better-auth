import Link from 'next/link'
import React, { ReactNode } from 'react'

const AuthLayout = ({children} : {children : ReactNode}) => {
  return (
   <main className='relative flex min-h-svh flex-col items-center justify-center'>
    <Link href={'/'} className='absolute top-4 left-4'>Go Back</Link>
    <div className='flex w-full max-w-lg flex-col gap-4'>
     {children}
    </div>
   </main>
  )
}

export default AuthLayout