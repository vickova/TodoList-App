import React, { useState } from 'react';


const Toggle = ({children, toggle}) => {
  return (
    <div>
        {
            toggle?children:<></>
        }
    </div>
  )
}

export default Toggle