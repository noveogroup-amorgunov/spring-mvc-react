package com.mkyong.web.service.impl;

import com.mkyong.web.entity.Question;
import com.mkyong.web.entity.Tag;
import com.mkyong.web.repository.TagRepository;
import com.mkyong.web.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiecImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public Tag addTag(Tag tag) {
        Tag savedBank = tagRepository.saveAndFlush(tag);

        return savedBank;
    }

    @Override
    public void delete(long id) {
        tagRepository.delete(id);
    }

    @Override
    public Tag getByName(String name) {
        return tagRepository.findByName(name);
    }

    @Override
    public Tag editTag(Tag tag) {
        return tagRepository.saveAndFlush(tag);
    }

    @Override
    public List<Tag> getAll() {
        return tagRepository.findAll(sortByPopuparDesc());
    }

    private Sort sortByPopuparDesc() {
        return new Sort(Sort.Direction.DESC, "popular");
    }

    @Override
    public Tag getById(Long id) {
        return tagRepository.findById(id);
    }

    @Override
    public List<Tag> getByCharacters(String searchTerm) {
        return tagRepository.findByCharacters(searchTerm);
    }

}
