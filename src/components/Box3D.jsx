const SIZES = {
  s: 'w-36',
  m: 'w-48',
  l: 'w-80',
}

function Box3D({ children, width = '44' }) {
  return (
    <div class={[
      SIZES[width],
      `relative border-solid border-2 mb-7 ml-7 h-full`,
    ]}>
      <div class="absolute border-solid box-content border-2 border-l-0 w-5 h-full right-[-2px] translate-x-[100%] translate-y-[9px] skew-y-[45deg]"></div>
      {children}
      <div class="absolute border-solid box-content border-2 border-t-0 border-r-0 left-[-2px] h-5 w-full bottom-0 translate-y-[109%] translate-x-[11.8px] skew-x-[48deg]"></div>
    </div>
  )
}

export default Box3D;