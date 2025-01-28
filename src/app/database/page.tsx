'use client';
import { useState } from "react";
import dynamic from 'next/dynamic';
import axios from 'axios'; 
import './_style/style.css';
import { FormData, FormErrors } from "./_constants/type";

const AnimatedSideNav = dynamic(() => import('@/components/common/sideBar/animatedSideNav'), { ssr: true });
const TopBar = dynamic(() => import('@/components/common/topBar/topBar'), { ssr: true });

export default function DatabaseManagement() {
    const [formData, setFormData] = useState<FormData>({
        connectionType: "jdbc",
        database: "",
        host: "",
        dbName: "",
        port: "",
        username: "",
        password: "",
        url: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false); // To handle API loading state
    const [successMessage, setSuccessMessage] = useState(""); // For success feedback

    const databaseOptions = ["PostgreSQL", "MySQL", "MongoDB"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.database) newErrors.database = "Database is required";
        if (formData.connectionType === "advanced") {
            if (!formData.host) newErrors.host = "Host is required";
            if (!formData.dbName) newErrors.dbName = "Database name is required";
            if (!formData.port || isNaN(Number(formData.port)))
                newErrors.port = "Valid port is required";
        } else {
            if (!formData.url || !/^(jdbc:\w+):\/\/.+$/.test(formData.url))
                newErrors.url = "Valid JDBC URL is required";
        }
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCancel = () => {
        setFormData({
            connectionType: "jdbc",
            database: "",
            host: "",
            dbName: "",
            port: "",
            username: "",
            password: "",
            url: "",
        });
        setErrors({});
        setSuccessMessage("");
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            try {
                const response = await axios.post('/api/database', formData); // Replace with your API endpoint
                alert("saved successfully!");
                setSuccessMessage("Database connection saved successfully!");
                console.log(response.data); // Handle the response if needed
                handleCancel(); // Reset the form
            } catch (error) {
                console.error("Error saving database connection:", error);

            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <AnimatedSideNav />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <div className="flex-1 overflow-y-auto">
                    <h1 className="text-2xl font-bold mb-6 ml-6">Database Management</h1>
                    <div className="flex justify-center items-center min-h-screen p-4">
                        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
                            <form onSubmit={handleSave}>
                                <div className="mb-4 flex items-center space-x-4">
                                    <label className="flex items-center text-[#000000] font-bold">
                                        <input
                                            type="radio"
                                            name="connectionType"
                                            value="jdbc"
                                            checked={formData.connectionType === "jdbc"}
                                            onChange={handleChange}
                                            className="mr-2"
                                            style={{ accentColor: '#172B9E' }}
                                        />
                                        Connect via JDBC
                                    </label>
                                    <label className="flex items-center text-[#000000] font-bold">
                                        <input
                                            type="radio"
                                            name="connectionType"
                                            value="advanced"
                                            checked={formData.connectionType === "advanced"}
                                            onChange={handleChange}
                                            className="mr-2"
                                            style={{ accentColor: '#172B9E' }}
                                        />
                                        Advanced DB Configuration
                                    </label>
                                </div>
                                {/* Add database selection */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Database *</label>
                                    <select
                                        name="database"
                                        value={formData.database}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2"
                                    >
                                        <option value="">Select</option>
                                        {databaseOptions.map((db) => (
                                            <option key={db} value={db}>
                                                {db}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.database && (
                                        <p className="text-red-500 text-sm">{errors.database}</p>
                                    )}
                                </div>
                                {/* Form fields */}
                                {formData.connectionType === "advanced" ? (
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Host *</label>
                                            <input
                                                type="text"
                                                placeholder="Enter host"
                                                name="host"
                                                value={formData.host}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded p-2 custom-input"
                                            />
                                            {errors.host && (
                                                <p className="text-red-500 text-sm">{errors.host}</p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Database Name *</label>
                                            <input
                                                type="text"
                                                name="dbName"
                                                placeholder="Enter database name"
                                                value={formData.dbName}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded p-2 custom-input"
                                            />
                                            {errors.dbName && (
                                                <p className="text-red-500 text-sm">{errors.dbName}</p>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 mb-2">Port *</label>
                                            <input
                                                type="text"
                                                name="port"
                                                placeholder="12345"
                                                value={formData.port}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded p-2 custom-input"
                                            />
                                            {errors.port && (
                                                <p className="text-red-500 text-sm">{errors.port}</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 mb-2">URL *</label>
                                        <input
                                            type="text"
                                            name="url"
                                            placeholder="Enter Url here"
                                            value={formData.url}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded p-2 custom-input"
                                        />
                                        {errors.url && (
                                            <p className="text-red-500 text-sm">{errors.url}</p>
                                        )}
                                    </div>
                                )}
                                {/* Username and Password */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Username *</label>
                                    <input
                                        type="text"
                                        name="username"
                                         placeholder="Enter username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 custom-input"
                                    />
                                    {errors.username && (
                                        <p className="text-red-500 text-sm">{errors.username}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Password *</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-2 custom-input"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">{errors.password}</p>
                                    )}
                                </div>
                                {/* Submit and Cancel */}
                                <div className="mt-7 flex justify-end space-x-4">
                                    <button
                                        onClick={handleCancel}
                                        className="bg-white text-[#172B9E] px-4 py-2 mr-2 rounded border border-[#172B9E] font-semibold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={`bg-[#172B9E] text-white px-4 py-2 mr-2 rounded font-bold ${loading ? "opacity-50" : ""}`}
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                                {successMessage && (
                                    <p className="text-green-500 text-sm mt-4">{successMessage}</p>
                                )}
                                {errors.apiError && (
                                    <p className="text-red-500 text-sm mt-4">{errors.apiError}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



