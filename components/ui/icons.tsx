export function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8238 4.29848C12.2112 4.69207 12.2062 5.32522 11.8126 5.71265L6.44135 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.44135L11.8126 18.2873C12.2062 18.6748 12.2112 19.3079 11.8238 19.7015C11.4363 20.0951 10.8032 20.1001 10.4096 19.7127L3.29848 12.7127C3.10753 12.5247 3 12.2679 3 12C3 11.7321 3.10753 11.4753 3.29848 11.2873L10.4096 4.28735C10.8032 3.89991 11.4363 3.9049 11.8238 4.29848Z"
        fill="#1F2631"
      />
    </svg>
  );
}

export function IconChevronRight({ size = 24 }: { size?: 16 | 24 }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d={
          size === 16
            ? "M9.25105 7.24408C9.58579 6.91864 10.1285 6.91864 10.4632 7.24408L14.7489 11.4107C14.9097 11.567 15 11.779 15 12C15 12.221 14.9097 12.433 14.7489 12.5893L10.4632 16.7559C10.1285 17.0814 9.58579 17.0814 9.25105 16.7559C8.91632 16.4305 8.91632 15.9028 9.25105 15.5774L12.9307 12L9.25105 8.42259C8.91632 8.09715 8.91632 7.56951 9.25105 7.24408Z"
            : "M8.33473 5.34171C8.78105 4.8861 9.50467 4.8861 9.95098 5.34171L15.6653 11.175C15.8796 11.3938 16 11.6906 16 12C16 12.3094 15.8796 12.6062 15.6653 12.825L9.95098 18.6583C9.50467 19.1139 8.78105 19.1139 8.33474 18.6583C7.88842 18.2027 7.88842 17.464 8.33474 17.0084L13.2409 12L8.33474 6.99162C7.88842 6.53601 7.88842 5.79732 8.33473 5.34171Z"
        }
        fill="#A6ABB7"
      />
    </svg>
  );
}

export function IconPlus() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99997 3C10.5523 3 11 3.44771 11 4L11 8.99998L16 8.99999C16.5523 8.99999 17 9.44771 17 9.99999C17 10.5523 16.5523 11 16 11L11 11L11 16C11 16.5523 10.5523 17 9.99999 17C9.44771 17 8.99999 16.5523 8.99999 16L8.99998 11L4 11C3.44771 11 3 10.5523 3 9.99997C3 9.44768 3.44772 8.99997 4 8.99997L8.99998 8.99998L8.99997 4C8.99997 3.44772 9.44768 3 9.99997 3Z"
        fill="#692DEC"
      />
    </svg>
  );
}

export function IconStar({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 1.5L12.1 7.2L18.1 7.4L13.3 11.1L14.9 16.9L10 13.5L5.1 16.9L6.7 11.1L1.9 7.4L7.9 7.2L10 1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ic_out_20_flashOn — stroked lightning bolt from DS
// ic_24_networkSignalCrossedOut from DS
export function IconNetworkOff() {
  return (
    <svg width="24" height="24" viewBox="0 0 14 17" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1 9C1.55 9 2 9.45 2 10L2 15C2 15.55 1.55 16 1 16C0.45 16 0 15.55 0 15L0 10C0 9.45 0.45 9 1 9Z" fill="#1F2631"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M0.793 3.793C1.184 3.402 1.816 3.402 2.207 3.793L5.707 7.293L8 9.586L10 11.586L12 13.586L13.707 15.293C14.098 15.684 14.098 16.316 13.707 16.707C13.317 17.098 12.683 17.098 12.293 16.707L10 14.414L8 12.414L6 10.414L4 8.414L0.793 5.207C0.402 4.816 0.402 4.184 0.793 3.793Z" fill="#1F2631"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M13 0C13.55 0 14 0.45 14 1L14 13.586L12 11.586L12 1C12 0.45 12.45 0 13 0ZM10 9.586L10 5C10 4.45 9.55 4 9 4C8.45 4 8 4.45 8 5L8 7.586L10 9.586Z" fill="#1F2631"/>
      <path d="M9 16C9.55 16 10 15.55 10 15L10 14.414L8 12.414L8 15C8 15.55 8.45 16 9 16Z" fill="#1F2631"/>
      <path d="M6 15L6 10.414L4 8.414L4 15C4 15.55 4.45 16 5 16C5.55 16 6 15.55 6 15Z" fill="#1F2631"/>
    </svg>
  );
}

// ic_24_time — filled clock from DS
export function IconClock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="#1F2631"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 7C12.5523 7 13 7.44772 13 8V11.9212L15.6585 14.2474C16.0741 14.6111 16.1163 15.2429 15.7526 15.6585C15.3889 16.0741 14.7571 16.1163 14.3415 15.7526L11.3415 13.1276C11.1245 12.9377 11 12.6634 11 12.375V8C11 7.44772 11.4477 7 12 7Z"
        fill="#1F2631"
      />
    </svg>
  );
}

// ic_out_24_triangleAlarm — filled triangle alert from DS
export function IconTriangleAlert() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.8742 4.63261C12.4932 3.9468 11.5068 3.9468 11.1258 4.63261L4.52487 16.5144C4.15458 17.1809 4.63655 18 5.39903 18H18.601C19.3635 18 19.8454 17.1809 19.4751 16.5144L12.8742 4.63261ZM9.37753 3.66132C10.5205 1.60389 13.4795 1.6039 14.6225 3.66133L21.2234 15.5431C22.3343 17.5427 20.8884 20 18.601 20H5.39903C3.11157 20 1.66567 17.5427 2.77656 15.5431L9.37753 3.66132Z"
        fill="#1F2631"
      />
      <path
        d="M11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V9Z"
        fill="#1F2631"
      />
      <path
        d="M13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15Z"
        fill="#1F2631"
      />
    </svg>
  );
}

// ic_24_house — DS house icon (white fill, for use on #858c99 bg)
export function IconCity() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.626 4.78491C12.2603 4.49133 11.7397 4.49133 11.374 4.78491L5.37398 9.60158C5.13755 9.79138 5 10.0782 5 10.3814V18.3556C5 18.7115 5.28853 19 5.64444 19H8V16C8 13.7909 9.79086 12 12 12C14.2091 12 16 13.7909 16 16V19H18C18.5523 19 19 18.5523 19 18V10.3814C19 10.0782 18.8624 9.79138 18.626 9.60158L12.626 4.78491ZM10.122 3.22529C11.2191 2.34454 12.7809 2.34453 13.878 3.22529L19.878 8.04196C20.5873 8.61136 21 9.47182 21 10.3814V18C21 19.6569 19.6569 21 18 21H15C14.4477 21 14 20.5523 14 20V16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16V20C10 20.5523 9.55228 21 9 21H5.64444C4.18396 21 3 19.816 3 18.3556V10.3814C3 9.47182 3.41266 8.61136 4.12196 8.04196L10.122 3.22529Z"
        fill="white"
      />
    </svg>
  );
}

export function IconZone() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#858c99" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.5" stroke="#858c99" strokeWidth="1.5" />
      <path d="M12 2.5V8.5M12 15.5V21.5M2.5 12H8.5M15.5 12H21.5" stroke="#858c99" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconScooter() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="7" cy="23" r="4" stroke="#804aff" strokeWidth="1.8" />
      <circle cx="25" cy="23" r="4" stroke="#804aff" strokeWidth="1.8" />
      <path d="M17 8h4l4 10H10.5l2.5-5H17z" stroke="#804aff" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M17 8V5M17 5h3" stroke="#804aff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 23h3.5" stroke="#804aff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconBike() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="7" cy="22" r="4" stroke="#ff8c42" strokeWidth="1.8" />
      <circle cx="25" cy="22" r="4" stroke="#ff8c42" strokeWidth="1.8" />
      <path d="M7 22l5-8h8l5 8" stroke="#ff8c42" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 14l4 8" stroke="#ff8c42" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 10h4" stroke="#ff8c42" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconTrash({ color = "#575f6e" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 6V4h8v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 6l-1 14H6L5 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v4M14 11v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconRestore() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10a6.5 6.5 0 1 0 1.2-3.8" stroke="#692dec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 5.5V10H8" stroke="#692dec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
