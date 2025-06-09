import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import API from "../api/axiosInstance";
import { useUsers } from "../hooks/useUsers";

export default function Users() {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [confirmModal, setConfirmModal] = useState(false);
    const [targetUserId, setTargetUserId] = useState(null);
    const [search, setSearch] = useState("");

    const [newUsers, setNewUsers] = useState({
        username: "",
        email: "",
        password: "",
        role: "staff",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data: users = [], refetch } = useUsers();

const handleChange = (e) => {
    setNewUsers({ ...newUsers, [e.target.name]: e.target.value });
};


    const handleAddUsers = async (e) => {
        e.preventDefault();
        try {
            await API.post("/users", {
                ...newUsers,
                status: "aktif",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
            toast.success("User berhasil ditambahkan!");
            setShowModal(false);
            setNewUsers({ username: "", email: "", password: "", role: "staff" });
            refetch();
        } catch {
            toast.error("Gagal menambahkan user!");
        }
    };

    const handleEditUsers = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/users/${selectedUser._id}`, {
                ...selectedUser,
                updatedAt: new Date().toISOString(),
            });
            toast.success("User diperbarui!");
            setShowEditModal(false);
            refetch();
        } catch {
            toast.error("Gagal memperbarui user!");
        }
    };

    const handleResetPassword = (u) => {
        toast("Password user berhasil direset!");
    };

    const confirmDeactivate = (id) => {
        setTargetUserId(id);
        setConfirmModal(true);
    };

    const handleDeactivateUsers = async () => {
        try {
            await API.put(`/users/${targetUserId}`, {
                status: "nonaktif",
                updatedAt: new Date().toISOString(),
            });
            toast.error("User dinonaktifkan!");
            setConfirmModal(false);
            refetch();
        } catch {
            toast.error("Gagal menonaktifkan user.");
        }
    };

    const handleActivateUsers = async (id) => {
        try {
            await API.put(`/users/${id}`, {
                status: "aktif",
                updatedAt: new Date().toISOString(),
            });
            toast.success("User diaktifkan!");
            refetch();
        } catch {
            toast.error("Gagal mengaktifkan user.");
        }
    };

    const handleDeleteUser = async () => {
        try {
            await API.delete(`/users/${targetUserId}`);
            toast.success("User berhasil dihapus!");
            setShowDeleteModal(false);
            refetch();
        } catch (err) {
            toast.error("Gagal menghapus user.");
        }
    };

    const ConfirmDeactivateModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-sm text-center">
                <h2 className="text-lg font-bold mb-4">Yakin ingin menonaktifkan user ini?</h2>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => setConfirmModal(false)}
                        className="px-4 py-2 bg-zinc-300 rounded"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleDeactivateUsers}
                        className="px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Nonaktifkan
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                <h1 className="text-2xl font-bold">Manajemen User</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-600 text-white px-3 py-1.5 rounded whitespace-nowrap"
                >
                    + Tambah User
                </button>
            </div>

            <input
                type="text"
                placeholder="Cari username/email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 px-3 py-2 border rounded"
            />

            <div className="overflow-auto bg-white rounded shadow">
                <table className="min-w-full text-sm table-auto">
                    <thead className="bg-zinc-200">
                        <tr>
                            <th className="px-3 py-1">#</th>
                            <th className="px-3 py-1">Username</th>
                            <th className="px-3 py-1">Email</th>
                            <th className="px-3 py-1">Role</th>
                            <th className="px-3 py-1">Status</th>
                            <th className="px-3 py-1 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter(
                                (u) =>
                                    (u.username?.toLowerCase() || "").includes(search.toLowerCase()) ||
                                    (u.email?.toLowerCase() || "").includes(search.toLowerCase())
                            )
                            .map((u, i) => (
                                <tr key={u._id} className="border-b hover:bg-zinc-50">
                                    <td className="px-3 py-1">{i + 1}</td>
                                    <td className="px-3 py-1">{u.username}</td>
                                    <td className="px-3 py-1">{u.email}</td>
                                    <td className="px-3 py-1">{u.role}</td>
                                    <td className="px-3 py-1 capitalize">
                                        <span
                                            className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                                                u.status === "aktif"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-1 text-center space-x-2 whitespace-nowrap">
                                        <button
                                            onClick={() => handleEditUsers(u)}
                                            className="bg-yellow-500 text-white text-xs px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        {u.status === "aktif" ? (
                                            <button
                                                onClick={() => confirmDeactivate(u._id)}
                                                className="bg-red-600 text-white text-xs px-2 py-1 rounded"
                                            >
                                                Nonaktifkan
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleActivateUsers(u._id)}
                                                className="bg-green-600 text-white text-xs px-2 py-1 rounded"
                                            >
                                                Aktifkan
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleResetPassword(u)}
                                            className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
                                        >
                                            Reset Password
                                        </button>
                                        <button
                                            onClick={() => {
                                                setTargetUserId(u._id);
                                                setShowDeleteModal(true);
                                            }}
                                            className="bg-zinc-800 text-white text-xs px-2 py-1 rounded"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL TAMBAH */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Tambah User Baru</h2>
                        <form onSubmit={handleAddUsers} className="space-y-4">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={newUsers.username}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border rounded ${
                                    newUsers.username.length > 0 && newUsers.username.length < 3
                                        ? "border-red-500"
                                        : ""
                                }`}
                                required
                                minLength={3}
                                title="Username harus minimal 3 karakter"
                            />
                            {newUsers.username.length > 0 && newUsers.username.length < 3 && (
                                <p className="text-red-500 text-xs mt-1">
                                    Username harus minimal 3 karakter
                                </p>
                            )}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newUsers.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={newUsers.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-500"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <select
                                name="role"
                                value={newUsers.role}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="staff">Staff</option>
                                <option value="manager">Manager</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-zinc-300 rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={newUsers.username.length > 0 && newUsers.username.length < 3}
                                    className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL EDIT */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit User</h2>
                        <form onSubmit={handleUpdateUser} className="space-y-4">
                            <input
                                type="text"
                                value={selectedUser.username}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, username: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                            <input
                                type="email"
                                value={selectedUser.email}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, email: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                            <div className="relative">
                                <input
                                    type={showEditPassword ? "text" : "password"}
                                    value={selectedUser.password}
                                    onChange={(e) =>
                                        setSelectedUser({ ...selectedUser, password: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded pr-10"
                                    placeholder="Password baru (opsional)"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowEditPassword(!showEditPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-zinc-500"
                                >
                                    {showEditPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            <select
                                value={selectedUser.role}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, role: e.target.value })
                                }
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="staff">Staff</option>
                                <option value="manager">Manager</option>
                            </select>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="px-4 py-2 bg-zinc-300 rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow w-full max-w-sm text-center">
                        <h2 className="text-lg font-bold mb-4">
                            Yakin ingin menghapus user ini?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-zinc-300 rounded"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {confirmModal && <ConfirmDeactivateModal />}
        </div>
    );
}

