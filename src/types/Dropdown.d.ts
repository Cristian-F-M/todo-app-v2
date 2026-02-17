export type DropdownOptionProps = {
  onPress?: (e?: any) => void
  text: string
  className?: React.ClassAttributes<View>['className']
  textClassName?: React.ClassAttributes<Text>['className']
  icon?: React.ElementType
  iconProps?: React.SVGProps<SVGSVGElement>
  showIconOn?: 'before' | 'after'
  handleClose: (e?: any) => void
  handleOpen: (e?: any) => void
}

export type DropdownMenuProps = {
  visible: boolean
  trigger: React.ReactNode
  dropdownWidth?: number
  children: React.ReactNode
  handleOpen: () => void
  handleClose: () => void
  options?: DropdownOptionProps[]
  itemId: string
}
