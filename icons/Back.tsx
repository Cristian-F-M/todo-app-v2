import Svg, { SvgProps, Path } from 'react-native-svg'
const Back = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
    {...props}
  >
    <Path
      stroke="none"
      d="M0 0h24v24H0z"
      fill="none"
    />
    <Path d="M5 12l14 0" />
    <Path d="M5 12l6 6" />
    <Path d="M5 12l6 -6" />
  </Svg>
)
export default Back
