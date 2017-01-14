
package com.mkyong.web.repository;

import com.mkyong.web.entity.Answer;
import com.mkyong.web.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    @Query(value = "SELECT * FROM answer t WHERE t.user_id = :id",
            nativeQuery=true
    )
    List<Answer> findByUser(@Param("id") Long id);

    @Query("select t from Answer t where t.id = :id")
    Answer findById(@Param("id") Long id);


    @Query(value = "SELECT * FROM tag t WHERE LOWER(t.name) LIKE LOWER(CONCAT('%',:searchTerm, '%')) order by t.popular desc limit 10",
            nativeQuery=true
    )
    List<Tag> findByQuestionId();
}
