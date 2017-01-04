package com.mkyong.web.service;

import com.mkyong.web.entity.Tag;

import java.util.List;

public interface TagService {
    Tag addTag(Tag bank);
    void delete(long id);
    Tag getByName(String name);
    Tag editTag(Tag bank);
    List<Tag> getAll();
}