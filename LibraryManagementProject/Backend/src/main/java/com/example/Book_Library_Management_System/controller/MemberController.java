package com.example.Book_Library_Management_System.controller;

import com.example.Book_Library_Management_System.entity.Member;
import com.example.Book_Library_Management_System.entity.ResponseStructure;
import com.example.Book_Library_Management_System.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //
@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/save")
    public ResponseEntity<ResponseStructure<Member>> addMember(@RequestBody Member member) {
        return memberService.saveMember(member);
    }

    @GetMapping
    public ResponseEntity<ResponseStructure<List<Member>>> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseStructure<Member>> getMemberById(@PathVariable int id) {
        return memberService.getMemberById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseStructure<Member>> updateMember(@RequestBody Member member, @PathVariable int id) {
        return memberService.updateMemberById(member, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseStructure<String>> deleteMember(@PathVariable int id) {
        return memberService.deleteMemberById(id);
    }
}
