package com.example.Book_Library_Management_System.dao;

import com.example.Book_Library_Management_System.entity.Member;
import com.example.Book_Library_Management_System.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MemberDao {

    @Autowired
    private MemberRepository memberRepository;

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> getMemberById(int id) {
        return memberRepository.findById(id);
    }

    public boolean deleteMemberById(int id) {
        Optional<Member> existing = getMemberById(id);
        if (existing.isPresent()) {
            memberRepository.delete(existing.get());
            return true;
        }
        return false;
    }
}
