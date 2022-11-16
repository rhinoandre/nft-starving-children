import Nullstack from 'nullstack';

class Box3D extends Nullstack {
  render({ children, width='48', distance='5' }) {
    return (
      <div class={[
        `w-${width} relative border-solid border-2 mb-7 ml-7`,
        `before:absolute before:border-solid before:box-content before:border-2 before:border-l-0 before:top-[-2px] before:w-7 before:h-full before:right-0 before:translate-x-[100%] before:translate-y-[14px] before:skew-y-[45deg]`,
        `after:absolute after:border-solid after:box-content after:border-2 after:border-t-0 after:border-r-0 after:left-[-2px] after:h-7 after:w-full after:bottom-0 after:translate-y-[103%] after:translate-x-[14.3px] after:skew-x-[46deg]`
      ]}>
        {children}
      </div>
    )
  }

}

export default Box3D;