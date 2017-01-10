package com.mkyong.web.repository;

import com.mkyong.web.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("select t from Tag t where t.name = :name")
    Tag findByName(@Param("name") String name);

    @Query("select t from Tag t where t.id = :id")
    Tag findById(@Param("id") Long id);

    @Query("select t from Tag t order by t.popular desc")
    Tag findTop5PopularTags();

    @Query(value = "SELECT * FROM tag t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%',:searchTerm, '%')) order by t.popular desc limit 10",
            nativeQuery=true
    )
    List<Tag> findByCharacters(@Param("searchTerm") String searchTerm);

}
