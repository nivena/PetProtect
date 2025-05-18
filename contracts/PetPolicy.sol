// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title FractionalHQ Pet Insurance Policy Contract
/// @notice Allows users to purchase simple pet insurance policies and submit claims

contract PetPolicy {
    struct Policy {
        address owner;
        string petName;
        string imageURI;
        uint256 insuredAmount;
        uint256 startDate;
        uint256 endDate;
        bool active;
        uint256 claimCount;
    }

    mapping(address => Policy[]) public policies;
    uint256 public totalPolicies;

    uint256 public constant PREMIUM_PRICE = 0.01 ether; // Fixed premium for MVP
    uint256 public constant INSURED_AMOUNT = 1 ether;    // Max claimable per policy
    uint256 public constant POLICY_DURATION = 365 days; // 1 year policies

    event PolicyCreated(address indexed owner, uint256 indexed policyId);
    event ClaimSubmitted(address indexed owner, uint256 indexed policyId, uint256 timestamp);
    event PolicyDeactivated(address indexed owner, uint256 indexed policyId, uint256 timestamp);

    /// @notice Create a new insurance policy
    function createPolicy(
        string memory _petName,
        string memory _imageURI
    ) external payable returns (uint256) {
        require(msg.value == PREMIUM_PRICE, "Incorrect premium payment");

        policies[msg.sender].push(
            Policy({
                owner: msg.sender,
                petName: _petName,
                imageURI: _imageURI,
                insuredAmount: INSURED_AMOUNT,
                startDate: block.timestamp,
                endDate: block.timestamp + POLICY_DURATION,
                active: true,
                claimCount: 0
            })
        );

        uint256 newPolicyId = policies[msg.sender].length - 1;
        totalPolicies++;

        emit PolicyCreated(msg.sender, newPolicyId);
        return newPolicyId;
    }

    /// @notice View a specific policy
    function viewPolicy(uint256 _policyId) external view returns (Policy memory) {
        require(_policyId < policies[msg.sender].length, "Policy does not exist");
        return policies[msg.sender][_policyId];
    }

    /// @notice Submit a claim on a policy
    function submitClaim(uint256 _policyId) external {
        require(_policyId < policies[msg.sender].length, "Policy does not exist");

        Policy storage policy = policies[msg.sender][_policyId];

        require(policy.active, "Policy is not active");
        require(block.timestamp <= policy.endDate, "Policy expired");

        policy.claimCount += 1;

        emit ClaimSubmitted(msg.sender, _policyId, block.timestamp);
    }

    /// @notice Deactivate a policy (admin or self-service)
    function deactivatePolicy(uint256 _policyId) external {
        require(_policyId < policies[msg.sender].length, "Policy does not exist");

        Policy storage policy = policies[msg.sender][_policyId];
        require(policy.active, "Policy already inactive");

        // Optional: Add access control here if needed later
        policy.active = false;

        emit PolicyDeactivated(msg.sender, _policyId, block.timestamp);
    }

    /// @notice Get all policies owned by the sender
    function getMyPolicies() external view returns (Policy[] memory) {
        return policies[msg.sender];
    }
}