/* test/sample-test.js */
describe("StarvingChildren", function() {
  it("Should create and execute market sales", async function() {
    /* deploy the marketplace */
    const StarvingChildren = await ethers.getContractFactory("StarvingChildren")
    const nftStarvingChildren = await StarvingChildren.deploy()
    await nftStarvingChildren.deployed()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    const transaction = await nftStarvingChildren.createNFTs("https://www.mytokenlocation.com", "https://www.mytokenlocation.com", auctionPrice)
    const rc = await transaction.wait();
    const event = rc.events.find(event => event.event === 'Transfer');
    const [childTokenId, donationTokenId, price] = event.args;
    console.log(ethers.utils.parseUnits(childTokenId, 'decimals'), donationTokenId, price);
    // await nftStarvingChildren.createToken("https://www.mytokenlocation2.com", auctionPrice)

    // const [_, buyerAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    // await nftStarvingChildren.connect(buyerAddress).createMarketSale(1, { value: auctionPrice })

    // console.log('childNFT: ', childNFT)
  })
})