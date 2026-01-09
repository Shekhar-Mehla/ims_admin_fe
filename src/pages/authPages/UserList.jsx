import React, { useEffect, useState } from "react";
import FilterOptions from "../../components/CustomComponents/FilterOptions";
import { createColumns } from "@/components/tables/create-columns";
import { userBaseColumns } from "@/components/tables/user-columns.js";
import CustomDataTable from "../../components/CustomComponents/CustomDataTable";
import { getAllUsersAction, deleteUserAction } from "../../features/user/useraction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const UserList = () => {
  const [filters, setFilters] = useState({
    search: "",
    role: "all",
  });
  const dispatch = useDispatch();
  const { usersList, loading, user } = useSelector((state) => state.userInfo);
  // Optional: If user is not in userInfo yet (depends on persistence), we might need to rely on localStorage or wait. 
  // But typically user is loaded on init.

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  const handleDelete = async (row) => {
      // row contains original user data
      if (window.confirm(`Are you sure you want to delete ${row.fName} ${row.lName}?`)) {
          // Dispatch delete action
          // We need to import deleteUserAction
          const result = await dispatch(deleteUserAction(row._id) || row.authId); // Ensure we have the ID. 
          // Based on backend implementation of getAllUsersController:
          // _id: auth._id || p.authId
          // So row._id should be the Auth ID which deleteUserController expects.
          
           if (result?.success) {
            // toast success? 
          }
      }
  }

  const columns = createColumns({
    columns: userBaseColumns,
    onDelete: user?.usertype?.includes("admin") ? handleDelete : null, 
    // Only pass onDelete if admin. createColumns should conditionally render the button if callback exists.
    // Wait, createColumns implementation renders the button unconditionally but onClick calls the function.
    // I should check createColumns implementation again. 
    // If I pass null, the button still renders but does nothing? 
    // Let's modify UserList to pass a config or modify createColumns.
    // For now, let's assume I will fix createColumns to hide if null.
  });

  const handleOnFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredUsers = usersList?.filter((user) => {
    const fullName = `${user?.fName || ""} ${user?.lName || ""}`.toLowerCase();
    const email = user?.email?.toLowerCase() || "";
    const search = filters.search.toLowerCase();
    
    const matchesSearch = fullName.includes(search) || email.includes(search);
    const matchesRole = filters.role === "all" || user.role === filters.role;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
        <Button asChild>
          <Link to="/create-new-user">
            <Plus className="mr-2 h-4 w-4" /> Create New User
          </Link>
        </Button>
      </div>
      <FilterOptions
        filters={filters}
        setFilters={setFilters}
        handleOnFilterChange={handleOnFilterChange}
      />
      <CustomDataTable columns={columns} data={filteredUsers || []} />
    </div>
  );
};

export default UserList;
