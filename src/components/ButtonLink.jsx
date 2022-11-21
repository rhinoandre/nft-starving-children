import { twMerge } from 'tailwind-merge';

export default function ButtonLink({ href, class: clazz = '', onclick, children }) {
  const classes = twMerge(`
    cursor-pointer
    bg-mustard
    p-2
    text-center
    font-extrabold
    text-black
    ${clazz}
  `)
  return (
    <a
      href={href}
      onclick={onclick}
      class={classes}
    >
      {children}
    </a>
  );
}
