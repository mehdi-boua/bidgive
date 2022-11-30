package fr.bidgive.api.repository;

import fr.bidgive.api.model.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, Integer> {
    @Query("SELECT * from users WHERE mail = :mail;")
    public Optional<User> getUserByMail(String mail);
}
