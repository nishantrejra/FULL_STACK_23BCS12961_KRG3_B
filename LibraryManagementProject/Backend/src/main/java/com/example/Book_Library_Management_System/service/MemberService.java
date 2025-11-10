package com.example.Book_Library_Management_System.service;

import com.example.Book_Library_Management_System.dao.MemberDao;
import com.example.Book_Library_Management_System.entity.Member;
import com.example.Book_Library_Management_System.entity.ResponseStructure;
import com.example.Book_Library_Management_System.exception.MemberNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberDao memberDao;

    public ResponseEntity<ResponseStructure<Member>> saveMember(Member member) {
        ResponseStructure<Member> structure = new ResponseStructure<>();
        structure.setData(memberDao.saveMember(member));
        structure.setMessage("Member added successfully");
        structure.setStatusCode(HttpStatus.CREATED.value());
        return new ResponseEntity<>(structure, HttpStatus.CREATED);
    }

    public ResponseEntity<ResponseStructure<List<Member>>> getAllMembers() {
        List<Member> list = memberDao.getAllMembers();
        if (!list.isEmpty()) {
            ResponseStructure<List<Member>> structure = new ResponseStructure<>("Members found", HttpStatus.OK.value(), list);
            return new ResponseEntity<>(structure, HttpStatus.OK);
        }
        throw new MemberNotFoundException("No members found");
    }

    public ResponseEntity<ResponseStructure<Member>> getMemberById(int id) {
        Optional<Member> member = memberDao.getMemberById(id);
        if (member.isPresent()) {
            ResponseStructure<Member> structure = new ResponseStructure<>("Member found", HttpStatus.OK.value(), member.get());
            return new ResponseEntity<>(structure, HttpStatus.OK);
        }
        throw new MemberNotFoundException("Member not found with ID: " + id);
    }

    public ResponseEntity<ResponseStructure<Member>> updateMemberById(Member newMember, int id) {
        Optional<Member> existing = memberDao.getMemberById(id);
        if (existing.isPresent()) {
            Member old = existing.get();
            old.setName(newMember.getName());
            old.setEmail(newMember.getEmail());
            old.setPhone(newMember.getPhone());
            old.setAddress(newMember.getAddress());

            Member updated = memberDao.saveMember(old);
            ResponseStructure<Member> structure = new ResponseStructure<>("Member updated successfully", HttpStatus.OK.value(), updated);
            return new ResponseEntity<>(structure, HttpStatus.OK);
        }
        throw new MemberNotFoundException("Member not found with ID: " + id);
    }

    public ResponseEntity<ResponseStructure<String>> deleteMemberById(int id) {
        if (memberDao.deleteMemberById(id)) {
            ResponseStructure<String> structure = new ResponseStructure<>("Member deleted successfully", HttpStatus.OK.value(), "Deleted");
            return new ResponseEntity<>(structure, HttpStatus.OK);
        }
        throw new MemberNotFoundException("Member not found with ID: " + id);
    }
}
