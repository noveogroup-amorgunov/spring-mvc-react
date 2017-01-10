package com.mkyong.web.service;

import com.mkyong.web.entity.Tag;

import java.util.List;

public interface TagService {
    Tag addTag(Tag tag);
    void delete(long id);
    Tag getByName(String name);
    Tag getById(Long id);
    Tag editTag(Tag tag);

    List<Tag> getAll();
    // List<Tag> findAllByOrderByPopularDesc();
    List<Tag> getByCharacters(String searchTerm);
}