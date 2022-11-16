import Nullstack from 'nullstack';

class Price extends Nullstack {
  render({ value }) {
    return (
    <>
      <p>Price</p>
      <div class="flex gap-2">
        <img src='/tap.svg' /> {value}
      </div>
    </>)
  }

}

export default Price;