import React, {Component} from 'react'

import {
  Image,
  Dimensions,
} from 'react-native'

const Assassin3 = ({source, originalWidth, originalHeight}) => {
  let windowWidth = Dimensions.get('window').width
  let widthChange = ((windowWidth-10)/originalWidth)/6
  let newWidth = originalWidth * widthChange
  let newHeight = originalHeight * widthChange
  return (
    <Image source={source} style={{width:newWidth, height:newHeight, bottom:0}}/>
  )
}

export default Assassin3
