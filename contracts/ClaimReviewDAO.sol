// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Claim Review DAO for Insurance Claims
/// @notice Simple DAO-style voting to approve or reject submitted claims

contract ClaimReviewDAO {
    enum VoteType { None, Approve, Reject }

    struct ClaimProposal {
        uint256 policyId;
        address claimant;
        string description;
        string documentURI; // IPFS or server link to vet invoice
        uint256 yesVotes;
        uint256 noVotes;
        bool resolved;
        mapping(address => VoteType) votes;
    }

    uint256 public proposalCount;
    mapping(uint256 => ClaimProposal) public proposals;

    event ProposalSubmitted(uint256 indexed proposalId, address indexed claimant);
    event VoteCast(uint256 indexed proposalId, address indexed voter, VoteType vote);
    event ProposalResolved(uint256 indexed proposalId, bool approved);

    /// @notice Submit a new claim proposal
    function submitProposal(
        uint256 _policyId,
        string memory _description,
        string memory _documentURI
    ) external {
        ClaimProposal storage p = proposals[proposalCount];
        p.policyId = _policyId;
        p.claimant = msg.sender;
        p.description = _description;
        p.documentURI = _documentURI;

        emit ProposalSubmitted(proposalCount, msg.sender);
        proposalCount++;
    }

    /// @notice Vote on an open claim proposal
    function vote(uint256 _proposalId, bool approve) external {
        ClaimProposal storage proposal = proposals[_proposalId];

        require(!proposal.resolved, "Proposal already resolved");
        require(proposal.votes[msg.sender] == VoteType.None, "Already voted");

        if (approve) {
            proposal.yesVotes++;
            proposal.votes[msg.sender] = VoteType.Approve;
        } else {
            proposal.noVotes++;
            proposal.votes[msg.sender] = VoteType.Reject;
        }

        emit VoteCast(_proposalId, msg.sender, proposal.votes[msg.sender]);

        // Auto-resolve for demo: require 3 votes total
        if (proposal.yesVotes + proposal.noVotes >= 3) {
            proposal.resolved = true;
            emit ProposalResolved(_proposalId, proposal.yesVotes > proposal.noVotes);
        }
    }

    /// @notice View a specific proposal
    function getProposal(uint256 _proposalId)
        external
        view
        returns (
            uint256 policyId,
            address claimant,
            string memory description,
            string memory documentURI,
            uint256 yesVotes,
            uint256 noVotes,
            bool resolved,
            VoteType voterVote
        )
    {
        ClaimProposal storage p = proposals[_proposalId];
        return (
            p.policyId,
            p.claimant,
            p.description,
            p.documentURI,
            p.yesVotes,
            p.noVotes,
            p.resolved,
            p.votes[msg.sender]
        );
    }
}