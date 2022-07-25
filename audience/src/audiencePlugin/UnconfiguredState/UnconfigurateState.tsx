import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={52}
    height={52}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m14.097 37.17 12.135 7.304 12.976-7.343c.624-.37 1.03-.851 1.346-1.613.367-.884.613-2.185.613-3.985V16.67L26.11 7.58l-15.278 9.112v14.841a6.5 6.5 0 0 0 3.225 5.615l.039.022ZM4.333 13 26.131 0l21.536 13v18.533c0 4.624-1.218 8.9-5.212 11.23L26.131 52l-15.348-9.238a13 13 0 0 1-6.45-11.229V13Z"
      fill="#DDE3EE"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.48 16.48a3.25 3.25 0 0 1 4.596 0L26 21.402l4.924-4.924a3.25 3.25 0 0 1 4.596 4.597L30.596 26l4.924 4.924a3.25 3.25 0 1 1-4.596 4.596L26 30.596l-4.924 4.924a3.25 3.25 0 0 1-4.596-4.596L21.404 26l-4.924-4.924a3.25 3.25 0 0 1 0-4.597Z"
      fill="#DDE3EE"
    />
  </svg>
)

export default SvgComponent