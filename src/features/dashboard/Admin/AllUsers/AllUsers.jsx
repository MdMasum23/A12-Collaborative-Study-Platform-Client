import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import UserRow from './UserRow';
import UserCard from './UserCard';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${searchTerm}`);
            return res.data;
        }
    });

    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">👥 Manage All Users</h2>

            <form
                onSubmit={handleSearch}
                className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6"
            >
                <input
                    type="text"
                    className="input input-bordered w-full max-w-sm"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {isLoading ? (
                <p className="text-center">Loading users...</p>
            ) : (
                <>
                    {/* Card View for small & medium */}
                    <div className="block lg:hidden space-y-4">
                        {users.map((user, index) => (
                            <UserCard
                                key={user._id}
                                index={index}
                                user={user}
                                refetch={refetch}
                            />
                        ))}
                    </div>

                    {/* Table View for large and up */}
                    <div className="hidden lg:block overflow-x-auto rounded-lg shadow">
                        <table className="table table-zebra w-full">
                            <thead className="bg-base-200">
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Current Role</th>
                                    <th>Update Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <UserRow
                                        key={user._id}
                                        index={index}
                                        user={user}
                                        refetch={refetch}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllUsers;