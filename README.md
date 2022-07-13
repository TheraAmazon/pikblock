# 1.Local setup
To run this project locally, follow these steps.

Clone the project locally, change into the directory, and install the dependencies:
git clone https://github.com/TheraFoundationGlobal/pikblock.git

cd pikblock

# install using NPM or Yarn

npm install

or

yarn


# 2.Start the local Hardhat node
npx hardhat node


# 3.With the network running, deploy the contracts to the local network in a separate terminal window
npx hardhat run scripts/deploy.js --network localhost


# 4.Start the app
npm run dev
