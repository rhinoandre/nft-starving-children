function Box3D({ children, class: clazz }) {
  return (
    <div class={[
      clazz,
      `relative border-solid border-2 mb-6 mr-6`,
    ]}>
      <div class="absolute border-solid box-content border-2 border-l-0 w-5 h-full right-[-2px] translate-x-[100%] translate-y-[9px] skew-y-[45deg]"></div>
      {children}
      <div class="absolute border-solid box-content border-2 border-t-0 border-r-0 left-[-2px] h-5 w-full bottom-0 translate-y-[109%] translate-x-[11.8px] skew-x-[48deg]"></div>
    </div>
  )
}

export default Box3D;