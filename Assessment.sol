// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChocolateShop {
    mapping(address => uint256) public chocolateBalances;

    event ChocolateBought(address indexed buyer, uint256 amount);
    event ChocolateSold(address indexed seller, uint256 amount);

    function buyChocolate(uint256 quantity) public payable {
        uint256 price = quantity * 1 ; // 1 ether per chocolate
        require(msg.value >= price, "Insufficient ether sent");
        chocolateBalances[msg.sender] += quantity;
        emit ChocolateBought(msg.sender, quantity);
    }

    function sellChocolate(uint256 quantity) public {
        require(chocolateBalances[msg.sender] >= quantity, "Insufficient chocolates");
        chocolateBalances[msg.sender] -= quantity;
        payable(msg.sender).transfer(quantity * 1 ); // 1 ether per chocolate
        emit ChocolateSold(msg.sender, quantity);
    }

    function getBalance(address account) external view returns (uint256) {
        return chocolateBalances[account];
    }
}