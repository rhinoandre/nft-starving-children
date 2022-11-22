import Label from './Label'

export default function TextControl({ bind, label, placeholder }) {
  return (
    <div>
      {label && (
        <div class="flex w-full justify-between">
          <Label>{label}</Label>
        </div>
      )}
      <input
        class="w-full border border-white bg-black p-2 text-base font-extrabold text-white outline-none"
        placeholder={placeholder}
        bind={bind}
      />
    </div>
  )
}
