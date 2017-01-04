package com.mkyong.web.repository;

import com.mkyong.web.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("select t from Tag t where t.name = :name")
    Tag findByName(@Param("name") String name);

}
