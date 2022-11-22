import Label from './Label'

export default function TextareaControl({ bind, label, hint }) {
  return (
    <div>
      {label && (
        <div class="flex flex-col w-full">
          <Label>{label}</Label>
          {hint && <p class="text-xs text-gray-300 mb-2">{hint}</p>}
        </div>
      )}
      <textarea
        class="h-28 w-full border border-white bg-black p-2 text-base font-extrabold text-white outline-none"
        bind={bind}
      />
    </div>
  )
}
