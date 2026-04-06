import React, { Suspense } from 'react'
import Update from '@/component/Update'
const page = () => {
  return (
    <>
    <Suspense>
        <Update></Update>
    </Suspense>
    </>
  )
}

export default page
