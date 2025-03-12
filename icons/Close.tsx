import Svg, { Path } from 'react-native-svg'
const Close = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path
      stroke="none"
      d="M0 0h24v24H0z"
      fill="none"
    />
    <Path d="M18 6l-12 12" />
    <Path d="M6 6l12 12" />
  </Svg>
)
export default Close
