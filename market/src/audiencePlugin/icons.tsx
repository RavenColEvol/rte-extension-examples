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
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C2.68447 0 0 2.68794 0 6C0 8.22241 0.749719 8.91691 4.72722 15.2945C5.31425 16.2357 6.68641 16.2346 7.27275 15.2945C11.2523 8.91357 12 8.22197 12 6C12 2.68447 9.31207 0 6 0ZM6 14.5C2.018 8.11519 1.5 7.71213 1.5 6C1.5 3.51472 3.51472 1.5 6 1.5C8.48528 1.5 10.5 3.51472 10.5 6C10.5 7.70478 10.0261 8.04454 6 14.5ZM3.5 6C3.5 4.61928 4.61928 3.5 6 3.5C7.38072 3.5 8.5 4.61928 8.5 6C8.5 7.38072 7.38072 8.5 6 8.5C4.61928 8.5 3.5 7.38072 3.5 6Z" fill="#647696" />
    </svg>
    );
}
