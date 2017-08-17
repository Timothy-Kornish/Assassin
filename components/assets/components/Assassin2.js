import React, {Component} from 'react'

import {
  Image,
  Dimensions,
} from 'react-native'

const Assassin2 = ({source, originalWidth, originalHeight}) => {
  let windowWidth = Dimensions.get('window').width
  let widthChange = ((windowWidth-10)/originalWidth)/6
  let newWidth = originalWidth * widthChange
  let newHeight = originalHeight * widthChange
  return (
    <Image source={source} style={{width:newWidth*1.5, height:newHeight*1.5, left:40}}/>
  )
}

export default Assassin2
