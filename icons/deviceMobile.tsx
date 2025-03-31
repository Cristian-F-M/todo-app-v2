import Svg, { SvgProps, Path } from 'react-native-svg'
const DeviceMobile = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-device-mobile"
    {...props}
  >
    <Path
      stroke="none"
      d="M0 0h24v24H0z"
      fill="none"
    />
    <Path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14z" />
    <Path d="M11 4h2" />
    <Path d="M12 17v.01" />
  </Svg>
)
export default DeviceMobile
