export default function addressShortener({ address = '' }) {
  return `${address.substring(0, 7)}...${address.substring(35, 42)}`
}
