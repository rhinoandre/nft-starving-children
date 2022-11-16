import Nullstack from 'nullstack';
import Icon from './Icon';

class Price extends Nullstack {
  render({ value }) {
    return (
    <>
      <p>Price</p>
      <div class="flex gap-2">
        <Icon type="tap" /> {value}
      </div>
    </>)
  }

}

export default Price;