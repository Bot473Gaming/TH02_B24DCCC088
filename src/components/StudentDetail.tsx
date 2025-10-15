import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
        name: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}

const StudentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get<User>(
                    `https://jsonplaceholder.typicode.com/users/${id}`,
                );
                setUser(response.data);
            } catch (err) {
                setError("Could not fetch student details.");
            }
        };
        fetchUser();
    }, [id]);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!user) {
        return <p>Loading student details...</p>;
    }

    return (
        <div>
            <h2 style={{marginBottom: "1rem"}}>Chi tiết sinh viên</h2>
            <p>
                <strong>Tên:</strong> {user.name}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Số điện thoại:</strong> {user.phone}
            </p>
            <p>
                <strong>Website:</strong> {user.website}
            </p>
            <Link to="/students">⬅ Quay lại danh sách</Link>
        </div>
    );
};

export default StudentDetail;
