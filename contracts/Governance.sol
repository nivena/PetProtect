// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// import "./Ownership.sol";

contract Governance {
    struct Proposal {
        uint256 id;
        uint256 propertyId; // ✅ Track the property this proposal belongs to
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        address proposer;
        mapping(address => bool) voted; // Track voters
    }

    // Ownership public ownershipContract; // 🔒 Commented for Insurance-only use

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    uint256[] public proposalIds;

    event ProposalCreated(uint256 id, string description, address proposer);
    event Voted(uint256 id, address voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 id);

    constructor(address _ownershipContract) {
        // ownershipContract = Ownership(payable(_ownershipContract));
    }

    function createProposal(uint256 propertyId, string calldata _description) public {
        // require(ownershipContract.isPropertyOwner(propertyId, msg.sender), "Only property owners can create proposals.");

        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.propertyId = propertyId;
        newProposal.description = _description;
        newProposal.votesFor = 0;
        newProposal.votesAgainst = 0;
        newProposal.executed = false;
        newProposal.proposer = msg.sender;

        proposalIds.push(proposalCount);
        emit ProposalCreated(proposalCount, _description, msg.sender);

        proposalCount++;
    }

    function isPropertyOwner(uint256 propertyId, address user) public pure returns (bool) {
        // placeholder stub — adjust for insurance later
        propertyId;
        user;
        return true;
    }

    function voteOnProposal(uint256 _proposalId, bool support) public {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voted[msg.sender], "You have already voted.");
        require(!proposal.executed, "Proposal already executed.");

        uint256 voterShares = 1; // Stubbed for testing (replace with real logic)

        if (support) {
            proposal.votesFor += voterShares;
        } else {
            proposal.votesAgainst += voterShares;
        }

        proposal.voted[msg.sender] = true;
        emit Voted(_proposalId, msg.sender, support, voterShares);
    }

    function executeProposal(uint256 _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed.");

        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        require(totalVotes > 0, "No votes cast.");

        if (proposal.votesFor > proposal.votesAgainst) {
            proposal.executed = true;
            emit ProposalExecuted(_proposalId);
        }
    }

    function hasVoted(uint256 _proposalId, address _voter) public view returns (bool) {
        return proposals[_proposalId].voted[_voter];
    }

    function getAllProposals() public view returns (
        uint256[] memory ids, 
        uint256[] memory propertyIds, 
        string[] memory descriptions, 
        uint256[] memory votesFor, 
        uint256[] memory votesAgainst, 
        bool[] memory executed, 
        address[] memory proposers
    ) {
        uint256 length = proposalIds.length;
        ids = new uint256[](length);
        propertyIds = new uint256[](length);
        descriptions = new string[](length);
        votesFor = new uint256[](length);
        votesAgainst = new uint256[](length);
        executed = new bool[](length);
        proposers = new address[](length);

        for (uint256 i = 0; i < length; i++) {
            uint256 proposalId = proposalIds[i];
            Proposal storage proposal = proposals[proposalId];
            ids[i] = proposal.id;
            propertyIds[i] = proposal.propertyId;
            descriptions[i] = proposal.description;
            votesFor[i] = proposal.votesFor;
            votesAgainst[i] = proposal.votesAgainst;
            executed[i] = proposal.executed;
            proposers[i] = proposal.proposer;
        }

        return (ids, propertyIds, descriptions, votesFor, votesAgainst, executed, proposers);
    }
}
