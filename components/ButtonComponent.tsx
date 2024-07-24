import React from 'react'
import { Button } from 'react-native'

const ButtonComponent = ({title, btnFunction, team}) => {
  return (
    <Button
        title={title}
        onPress={()=> {
            btnFunction(team)
        }}
        // disabled
        // color={'red'}
    />
  )
}

export default ButtonComponent