//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

contract Mint is ERC721Enumerable, Ownable {
    /*dev keep track of balances of each address
    */
    mapping(address => uint256) public balances;
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {

    }

    function mint(uint256 numberOfMints) public payable{
        uint256 supply = totalSupply();
        for(uint256 i; i< numberOfMints; i++){
            /*dev allows users to safely mint using the sefeMint function
            and each time there is a new mint dev increment supply by one*/
            _safeMint(msg.sender, supply +i);
            /*dev keep track of addresses calling the mint function and increment their
            balances by one everytime they mint*/
            balances[msg.sender] ++;
        }
    }
   
}
