import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
}

const StudentListApp: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true)
        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>(
                    "https://jsonplaceholder.typicode.com/users",
                );
                setUsers(response.data);
                setLoading(false)
            } catch (err) {
                setError("Could not fetch student data.");
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2 style={{marginBottom: "1rem"}}>Danh sách sinh viên</h2>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/students/${user.id}`}>{user.name}</Link> - (
                        {user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentListApp;
