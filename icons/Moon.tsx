import Svg, { SvgProps, Path } from 'react-native-svg'
const Moon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-moon"
    {...props}
  >
    <Path
      stroke="none"
      d="M0 0h24v24H0z"
      fill="none"
    />
    <Path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
  </Svg>
)
export default Moon
