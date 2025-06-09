/**
 * client/src/pages/Inventory.jsx
 * Halaman inventaris barang yang menampilkan daftar produk, kategori, dan lokasi
 * Memungkinkan filter kategori, tambah kategori, tambah produk, dan edit produk
 * Menggunakan API untuk mengambil dan mengelola data produk, kategori, dan lokasi
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../api/axiosInstance";
import { getCategories, addCategory } from "../api/categories";

export default function Inventory() {
  // State untuk mengatur tampilan modal kategori, produk, dan edit produk
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // State untuk filter kategori yang dipilih
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  // State untuk menyimpan data kategori, produk, lokasi
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);

  // State untuk input nama kategori baru
  const [newCategoryName, setNewCategoryName] = useState("");

  // State untuk input produk baru
  const [newProduct, setNewProduct] = useState({
    nama: "",
    deskripsi: "",
    stok: 0,
    lokasi: "",
    kategori: "",
    foto: "",
    selectedImage: "",
    harga: "",
  });

  // State untuk produk yang sedang diedit
  const [editProduct, setEditProduct] = useState(null);

  // Ambil role user dari localStorage
  const role = localStorage.getItem("role");

  // useEffect untuk mengambil data produk, lokasi, dan kategori saat komponen mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get("/items");
        setItems(res.data);
      } catch (err) {
        toast.error("Gagal mengambil data produk");
      }
    };

    const fetchLocations = async () => {
      try {
        const res = await API.get("/locations");
        setLocations(res.data);
      } catch (err) {
        toast.error("Gagal mengambil data lokasi");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (err) {
        toast.error("Gagal mengambil data kategori");
      }
    };

    fetchItems();
    fetchLocations();
    fetchCategories();
  }, []);

  // Filter produk berdasarkan kategori yang dipilih
  const filteredItems = selectedCategoryFilter
    ? items.filter(item => {
        if (typeof item.kategori === "object" && item.kategori !== null) {
          return item.kategori._id === selectedCategoryFilter;
        }
        return item.kategori === selectedCategoryFilter;
      })
    : items;

  // Handler perubahan input nama kategori baru
  const handleCategoryNameChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  // Handler submit tambah kategori baru
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await addCategory({ nama: newCategoryName });
      toast.success("Kategori berhasil ditambahkan!");
      setShowCategoryModal(false);
      setNewCategoryName("");
      const res = await getCategories();
      setCategories(res);
    } catch (err) {
      toast.error("Gagal menambahkan kategori");
    }
  };

  // Handler perubahan input produk baru
  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handler submit tambah produk baru
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      // kategori sekarang berupa id dari dropdown select
      const kategoriId = newProduct.kategori;
      if (!kategoriId) {
        toast.error("Kategori harus dipilih");
        return;
      }
      const productToSend = {
        ...newProduct,
        lokasi: newProduct.lokasi === "" ? null : (newProduct.lokasi || (locations.length > 0 ? locations[0]._id : null)),
        kategori: kategoriId,
        stok: Number(newProduct.stok),
        harga: newProduct.harga === "" ? 0 : Number(newProduct.harga.replace(/[^0-9.-]+/g,"")), // Konversi harga ke angka, tangani string kosong dan hapus karakter non-numerik
      };
      if (!productToSend.lokasi || !productToSend.kategori) {
        toast.error("Lokasi dan Kategori harus dipilih");
        return;
      }
      const response = await API.post("/items", productToSend);
      toast.success("Produk berhasil ditambahkan!");
      setShowProductModal(false);
      setNewProduct({
        nama: "",
        deskripsi: "",
        stok: 0,
        lokasi: locations.length > 0 ? locations[0]._id : "",
        kategori: "",
        foto: "",
        selectedImage: "",
        harga: "", // Reset field harga
      });
      // Tambahkan produk baru secara optimistik ke state items, override deskripsi dengan input form
      setItems(prevItems => [...prevItems, { ...response.data, deskripsi: newProduct.deskripsi }]);
    } catch (err) {
      const message = err.response?.data?.message || "Gagal menambahkan produk";
      toast.error(message);
    }
  };

  // Buka modal edit produk dengan data produk yang dipilih
  const openEditModal = (item) => {
    setEditProduct({
      ...item,
      deskripsi: item.deskripsi || "",
      kategori: typeof item.kategori === "object" && item.kategori !== null ? item.kategori._id : item.kategori,
      lokasi: item.lokasi?._id || item.lokasi || "",
    });
    setShowEditModal(true);
  };

  // Handler perubahan input edit produk
  const handleEditProductChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  // Handler submit update produk
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productToUpdate = {
        ...editProduct,
        stok: Number(editProduct.stok),
        lokasi: editProduct.lokasi === "" ? null : editProduct.lokasi,
        harga: editProduct.harga === "" ? 0 : Number(editProduct.harga.replace(/[^0-9.-]+/g,"")), // Konversi harga ke angka, tangani string kosong dan hapus karakter non-numerik
        deskripsi: editProduct.deskripsi || "",
      };
      const response = await API.put(`/items/${editProduct._id}`, productToUpdate);
      toast.success("Produk berhasil diperbarui!");
      setShowEditModal(false);
      setEditProduct(null);
      // Update state items secara optimistik dengan produk yang diperbarui termasuk deskripsi
      setItems(prevItems => prevItems.map(item => item._id === response.data._id ? response.data : item));
    } catch (err) {
      const message = err.response?.data?.message || "Gagal memperbarui produk";
      toast.error(message);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">Inventaris Barang</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label htmlFor="categoryFilter" className="mr-0 sm:mr-2 font-medium">Filter Kategori:</label>
          <select
            id="categoryFilter"
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="border rounded px-2 py-1 w-full sm:w-auto"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.nama}
              </option>
            ))}
          </select>
        </div>
        {role === "manager" && (
          <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
              onClick={() => setShowCategoryModal(true)}
            >
              + Tambah Kategori
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
              onClick={() => setShowProductModal(true)}
            >
              + Tambah Produk
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => {
            const category = categories.find(cat => {
              if (typeof item.kategori === "object" && item.kategori !== null) {
                return cat._id === item.kategori._id;
              } else if (typeof item.kategori === "string") {
                return cat._id === item.kategori;
              }
              return false;
            });
            const location = locations.find(loc => {
              if (typeof item.lokasi === "object" && item.lokasi !== null) {
                return loc._id === item.lokasi._id;
              } else if (typeof item.lokasi === "string") {
                return loc._id === item.lokasi;
              }
              return false;
            });
            return (
              <div key={item._id} className="border rounded shadow p-4 flex flex-col">
              <p className="text-sm font-medium mb-2">
                Stok: {item.stok}
              </p>
              <div className="h-40 bg-gray-100 flex items-center justify-center mb-4">
                {item.foto ? (
                  <img
                    src={item.foto}
                    alt={item.nama}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <h2 className="text-lg font-semibold mb-2">{item.nama}</h2>
              <p className="text-sm text-gray-600 mb-2 whitespace-pre-wrap break-words">
                {item.deskripsi || "Deskripsi tidak tersedia"}
              </p>
              <p className="text-sm font-medium mb-2">
                Kategori: {category ? category.nama : "Tidak ada"}
              </p>
              <p className="text-sm font-medium mb-2">
                Lokasi: {location ? location.nama_lokasi : "Tidak ada"}
              </p>
              <p className="text-sm font-medium mb-4">
                Harga: {item.harga ? `Rp ${item.harga.toLocaleString()}` : "N/A"}
              </p>
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                {role === "manager" && (
                  <button
                    onClick={async () => {
                      if (window.confirm(`Hapus produk ${item.nama}?`)) {
                        try {
                          await API.delete(`/items/${item._id}`);
                          toast.success("Produk berhasil dihapus");
                          const res = await API.get("/items");
                          setItems(res.data);
                        } catch (err) {
                          toast.error("Gagal menghapus produk");
                        }
                      }
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Hapus
                  </button>
                )}
              </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
