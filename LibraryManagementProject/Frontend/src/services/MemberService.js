import axios from "axios";

const BASE_URL = "http://localhost:8080/members";

class MemberService {
    getAllMembers() {
        return axios.get(BASE_URL);
    }

    addMember(member) {
        return axios.post(`${BASE_URL}/save`, member, {
            headers: { "Content-Type": "application/json" },
        });
    }

    updateMember(id, member) {
        return axios.put(`${BASE_URL}/${id}`, member, {
            headers: { "Content-Type": "application/json" },
        });
    }

    deleteMember(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    }

    getMemberById(id) {
        return axios.get(`${BASE_URL}/${id}`);
    }
}

export default new MemberService();
