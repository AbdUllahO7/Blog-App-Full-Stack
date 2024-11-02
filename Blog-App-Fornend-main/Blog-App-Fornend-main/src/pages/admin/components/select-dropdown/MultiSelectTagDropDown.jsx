import React from 'react'
import AsyncSelect from 'react-select/async';

function MultiSelectTagDropDown({
    defaultValue = [],
    loadOptions, // function
    onChange
}) {
    return <AsyncSelect 
        defaultValue={defaultValue}
        defaultOptions =  {true}
        isMulti = {true}
        loadOptions={loadOptions}
        className='relative z-30'
        onChange={onChange}
    />
}

export default MultiSelectTagDropDown