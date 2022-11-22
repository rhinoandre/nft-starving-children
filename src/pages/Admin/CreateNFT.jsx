import Nullstack from 'nullstack'

import ButtonLink from '../../components/ButtonLink'
import Label from '../../components/Label'
import SimpleTitle from '../../components/SimpleTitle'
import TextareaControl from '../../components/TextareaControl'
import TextControl from '../../components/TextControl'
import Icon from '../../components/Icon'

class CreateNFT extends Nullstack {
  childNFT = {
    name: '',
    description: '',
    price: '',
    fileUrl: '',
  }

  donationNFT = {
    name: '',
    description: '',
    price: '',
    fileUrl: '',
  }

  async uploadImageToIPFS({ sendFileToIPFS, event }) {
    const file = event.target.files[0];
    const inputId = event.target.id;
    try {
      const fileUrl = await sendFileToIPFS(file);
      const property = inputId.includes('SideA') ? 'childNFT' : 'donationNFT';
      this[property].fileUrl = fileUrl;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }

  renderImageUpload({ id, field }) {
    return (
      <div class="flex max-h-fit items-center justify-center border-2 border-dashed border-white p-4">
        {!field && (
          <div
            class="flex w-full cursor-pointer justify-center"
            onclick={() => document.getElementById(id).click()}
          >
            <Icon type="imagePlaceholder" class="w-10" />
          </div>
        )}
        {field && (
          <img
            onclick={() => document.getElementById(id).click()}
            class="cursor-pointer rounded"
            width="150"
            src={field}
          />
        )}
        <input
          hidden
          type="file"
          id={id}
          accept="image/*"
          oninput={this.uploadImageToIPFS}
        />
      </div>
    )
  }

  render() {
    return (
      <section class="flex gap-24 py-14 pl-10">
        <div class="w-96">
          <div>
            <SimpleTitle>Create a new NFT</SimpleTitle>
          </div>
          <div class="mt-10 flex flex-col gap-4">
            <Label>Image, Video, Audio, or 3D Model *</Label>
            <p class="text-xs text-gray-300">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </p>
            <ImageUpload id="fileSideA" field={this.childNFT.fileUrl} />
          </div>
          <div class="mt-4 flex flex-col gap-4">
            <TextControl bind={this.childNFT.name} label="Name *" />
            <TextControl bind={this.childNFT.externalLink} label="External Link" />
            {/* <div>
              <TextControl bind={this.childNFT.maxEdition} label="Max Editions" />
              <p class="mt-1 text-xs text-gray-300">
                Number of Editions that will be created
              </p>
            </div> */}
            <div>
              <TextareaControl
                bind={this.childNFT.description}
                label="Description *"
                hint="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
              />
            </div>
            <TextControl bind={this.childNFT.price} label="Price *" />
            <ButtonLink class="w-32 bg-yellow-500" onclick={this.createNftTemplates}>
              Create NFT
            </ButtonLink>
          </div>
        </div>
        <div class="w-96">
          <div>
            <SimpleTitle>
              <span class="text-light-pink">Side B</span> - NFT for donation
            </SimpleTitle>
          </div>
          <div class="mt-10 flex flex-col gap-4">
            <Label>Image, Video, Audio, or 3D Model *</Label>
            <p class="text-xs text-gray-300">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </p>
            <ImageUpload id="fileSideB" field={this.donationNFT.fileUrl} />
          </div>
          <div class="mt-4 flex flex-col gap-4">
            <TextControl bind={this.donationNFT.name} label="Name *" />
            <TextControl bind={this.donationNFT.externalLink} label="External Link" />
            {/* <div>
              <TextControl bind={this.donationNFT.maxEdition} label="Max Editions" />
              <p class="mt-1 text-xs text-gray-300">
                Number of Editions that will be created
              </p>
            </div> */}
            <div>
              <TextareaControl
                bind={this.donationNFT.description}
                label="Description *"
                hint="The description will be included on the item's detail page underneath its image. Markdown syntax is supported."
              />
            </div>
            <TextControl bind={this.donationNFT.price} label="Price *" />
          </div>
        </div>
      </section>
    )
  }
}

export default CreateNFT
