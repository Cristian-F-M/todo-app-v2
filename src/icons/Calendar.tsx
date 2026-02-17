import Svg, { SvgProps, Path } from 'react-native-svg'
const Calendar = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-week"
    {...props}
  >
    <Path
      stroke="none"
      d="M0 0h24v24H0z"
      fill="none"
    />
    <Path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
    <Path d="M16 3v4" />
    <Path d="M8 3v4" />
    <Path d="M4 11h16" />
    <Path d="M7 14h.013" />
    <Path d="M10.01 14h.005" />
    <Path d="M13.01 14h.005" />
    <Path d="M16.015 14h.005" />
    <Path d="M13.015 17h.005" />
    <Path d="M7.01 17h.005" />
    <Path d="M10.01 17h.005" />
  </Svg>
)
export default Calendar
