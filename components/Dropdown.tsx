import { useEffect, useRef, useState } from 'react'
import { Dimensions, Modal, Pressable, Text, View } from 'react-native'
import { DropdownOption } from './DropdownOption'
import type { DropdownMenuProps } from 'Dropdown'

export function DropdownMenu({
  visible,
  trigger,
  dropdownWidth = 120,
  handleOpen,
  handleClose,
  children,
}: DropdownMenuProps) {
  const triggerRef = useRef<View>(null)
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    flip: false,
  })

  useEffect(() => {
    if (triggerRef.current && visible) {
      triggerRef.current.measure((fx, fy, width, height, px, py) => {
        const { height: screenHeight } = Dimensions.get('window')
        const dropdownHeight = 150

        console.log({ py, dropdownHeight, screenHeight })

        const fitsBelow = py + dropdownHeight <= screenHeight
        const newY = fitsBelow ? py + height : py - dropdownHeight / 1.5

        setPosition({
          x: px + width / 2 - dropdownWidth / 1.09,
          y: newY - 30,
          width: width,
          flip: !fitsBelow,
        })
      })
    }
  }, [visible, dropdownWidth])

  return (
    <View>
      <View ref={triggerRef}>{trigger}</View>
      {visible && (
        <Modal
          animationType="fade"
          transparent={true}
        >
          <Pressable
            className="overlay bg-transparent absolute w-full h-full items-center justify-center"
            onPress={handleClose}
          >
            <View
              className="absolute z-50 bg-[#1f2937] border-gray-500 border shadow-lg rounded-lg overflow-hidden"
              style={{
                top: position.y,
                left: position.x,
                width: dropdownWidth,
              }}
            >
              {children}
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  )
}
