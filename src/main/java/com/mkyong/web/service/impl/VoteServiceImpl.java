package com.mkyong.web.service.impl;

import com.mkyong.web.entity.Vote;
import com.mkyong.web.repository.VoteRepository;
import com.mkyong.web.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteServiceImpl implements VoteService {
    @Autowired
    private VoteRepository voteRepository;

    @Override
    public Vote addVote(Vote tag) {
        Vote savedTag = voteRepository.saveAndFlush(tag);

        return savedTag;
    }

    @Override
    public void delete(long id) {
        voteRepository.delete(id);
    }

    @Override
    public Vote getById(Long id) {
        return voteRepository.findById(id);
    }

    @Override
    public Vote editVote(Vote tag) {
        return voteRepository.saveAndFlush(tag);
    }

    @Override
    public List<Vote> getAll() {
        return voteRepository.findAll();
    }

}
