package com.example.Book_Library_Management_System.repository;

import com.example.Book_Library_Management_System.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}
