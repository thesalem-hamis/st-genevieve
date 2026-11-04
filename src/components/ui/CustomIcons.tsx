import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

/**
 * Staggered Hamburger Icon
 */
export function CustomMenuIcon({
  size = 32,
  color = "#12312B",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="14" y="6.5" width="13" height="4" rx="2" fill={color} />
      <rect x="5" y="13.75" width="22" height="4" rx="2" fill={color} />
      <rect x="5" y="21" width="13" height="4" rx="2" fill={color} />
    </svg>
  );
}

/**
 * Bold Arrow Up
 */
export function CustomArrowUp({
  size = 32,
  color = "currentColor",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 29V4M16 4L4 16M16 4L28 16"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Bold Arrow Right
 */
export function CustomArrowRight({
  size = 24,
  color = "currentColor",
  className = "",
  ...props
}: IconProps) {
  return (
    <CustomArrowUp
      size={size}
      color={color}
      className={`rotate-90 ${className}`}
      {...props}
    />
  );
}

/**
 * Bold Arrow Up-Right
 */
export function CustomArrowUpRight({
  size = 24,
  color = "currentColor",
  className = "",
  ...props
}: IconProps) {
  return (
    <CustomArrowUp
      size={size}
      color={color}
      className={`rotate-45 ${className}`}
      {...props}
    />
  );
}

/**
 * Bold Arrow Left
 */
export function CustomArrowLeft({
  size = 24,
  color = "currentColor",
  className = "",
  ...props
}: IconProps) {
  return (
    <CustomArrowUp
      size={size}
      color={color}
      className={`-rotate-90 ${className}`}
      {...props}
    />
  );
}

/**
 * Bold Close Icon
 */
export function CustomCloseIcon({
  size = 32,
  color = "#12312B",
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 7L25 25M25 7L7 25"
        stroke={color}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
