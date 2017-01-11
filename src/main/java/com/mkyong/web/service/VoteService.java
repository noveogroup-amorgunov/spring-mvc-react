package com.mkyong.web.service;

import com.mkyong.web.entity.Vote;
import java.util.List;

public interface VoteService {
    Vote addVote(Vote vote);
    void delete(long id);
    Vote getById(Long id);
    Vote editVote(Vote vote);
    List<Vote> getAll();
}