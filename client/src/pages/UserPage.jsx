/**
 * client/src/pages/UserPage.jsx
 * Halaman yang menampilkan daftar user dengan nama dan role
 * Menggunakan hook useUsers untuk mengambil data user
 * Menampilkan loading dan error handling sederhana
 */

import { useUsers } from "../hooks/useUsers";

export default function UserPage() {
    // Mengambil data user dan status loading/error dari hook useUsers
    const { data: users, isLoading, isError } = useUsers();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading users</p>;

    return (
        <div className="p-6">
        <h2 className="text-lg font-bold mb-4">Daftar User</h2>
        <ul className="space-y-2">
            {users.map((user) => (
            <li key={user._id} className="p-3 bg-white rounded shadow">
                {user.username} - {user.role}
            </li>
            ))}
        </ul>
        </div>
    );
}
