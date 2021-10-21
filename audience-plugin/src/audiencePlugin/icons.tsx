import * as React from "react";

export function ExpandCloseIcon(props: any) {
    return (
        <svg
            style={{ margin: "4px 0" }}
            width={8}
            height={8}
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#prefix__clip0)">
                <path
                    d="M2.44.908h0L2.434.904A.334.334 0 012.36.796l-.304.13.304-.13A.335.335 0 012.668.33a.331.331 0 01.236.102h0l.004.004L6.236 3.77s0 0 0 0a.334.334 0 010 .473s0 0 0 0L2.91 7.575a.331.331 0 01-.561-.239c-.001-.087.032-.17.092-.233l2.854-2.861.235-.235-.235-.236L2.44.908z"
                    fill="#222"
                    stroke="#222"
                    strokeWidth={0.667}
                />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" d="M0 0h8v8H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function CheckedIcon(props) {
    return (
        <svg
            style={{ margin: "4px 0" }}
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0 3a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H3a3 3 0 01-3-3V3z"
                fill="#6C5CE7"
            />
            <path
                d="M4.21 8.145l2.91 2.875 5.121-5.094-1.11-1.106-4.01 3.996L5.31 7.04 4.21 8.145z"
                fill="#F9FBFD"
            />
        </svg>
    );
}

export function ExpandOpenIcon(props) {
    return (
        <svg
            style={{ margin: "4px 0" }}
            width={8}
            height={8}
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g clipPath="url(#prefix__clip0)">
                <path
                    d="M7.092 2.44h0l.004-.005a.334.334 0 01.108-.075l-.13-.304.13.304a.335.335 0 01.466.308.33.33 0 01-.102.236h0l-.004.004L4.23 6.236s0 0 0 0a.334.334 0 01-.473 0s0 0 0 0L.425 2.91a.331.331 0 01.239-.561c.087-.001.17.032.233.092l2.861 2.854.235.235.236-.235L7.092 2.44z"
                    fill="#222"
                    stroke="#222"
                    strokeWidth={0.667}
                />
            </g>
            <defs>
                <clipPath id="prefix__clip0">
                    <path fill="#fff" d="M0 0h8v8H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}

export function SemiCheckedIcon(props) {
    return (
        <svg
            style={{ margin: "4px 0" }}
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M0 3a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H3a3 3 0 01-3-3V3z"
                fill="#6C5CE7"
            />
            <path d="M11.877 7.5h-7.75v1.625h7.75V7.5z" fill="#F9FBFD" />
        </svg>
    );
}

export function UncheckedIcon(props) {
    return (
        <svg
            style={{ margin: "4px 0" }}
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M3 1h10v-2H3v2zm12 2v10h2V3h-2zm-2 12H3v2h10v-2zM1 13V3h-2v10h2zm2 2a2 2 0 01-2-2h-2a4 4 0 004 4v-2zm12-2a2 2 0 01-2 2v2a4 4 0 004-4h-2zM13 1a2 2 0 012 2h2a4 4 0 00-4-4v2zM3-1a4 4 0 00-4 4h2a2 2 0 012-2v-2z"
                fill="#A0AEC0"
            />
        </svg>
    );
}

export function AudienceIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
        >
            <path
                fill="#647696"
                stroke="#647696"
                strokeWidth="1.333"
                d="M13.517 14.667v-4.82c0-.173-.01-.345-.03-.514h.342c.752 0 1.504.726 1.504 1.8v2.72c0 .53-.363.814-.635.814h-1.181zM2.512 9.333a4.6 4.6 0 00-.029.515v4.819h-1.18c-.273 0-.636-.283-.636-.813v-2.722c0-1.073.752-1.799 1.504-1.799h.341zM6.48 8h3.04c.999 0 1.813.814 1.813 1.814v4.853H4.667V9.814C4.667 8.814 5.48 8 6.48 8zM8 1.333a2.337 2.337 0 00-2.333 2.334c0 .87.48 1.634 1.194 2.035L8 1.333zm0 0a2.337 2.337 0 012.333 2.334 2.335 2.335 0 01-3.472 2.035L8 1.333zM3.177 6.625h0A1.336 1.336 0 002 4.666c-.735 0-1.333.6-1.333 1.334a1.336 1.336 0 001.857 1.226l.653-.6zm0 0c-.143.267-.374.48-.652.6l.652-.6zM15.177 6.625h0A1.336 1.336 0 0014 4.666c-.735 0-1.333.6-1.333 1.334a1.336 1.336 0 001.857 1.226l.653-.6zm0 0c-.143.267-.374.48-.652.6l.652-.6z"
            ></path>
        </svg>
    );
}
