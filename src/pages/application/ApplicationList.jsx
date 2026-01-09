import React, { useEffect, useState } from "react";

import FilterOptions from "../../components/CustomComponents/FilterOptions";

import CustomTable from "../../components/CustomComponents/CustomTable";
// import { DataTable } from "@/components/ui/data-table";
import { createColumns } from "@/components/tables/create-columns";
import { applicationBaseColumns } from "@/components/tables/application-columns.js";
import CustomDataTable from "../../components/CustomComponents/CustomDataTable";
import { getAllApplicationAction } from "../../features/application/applicationaction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ApplicationList = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    fromDate: "",
    toDate: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applications } = useSelector((state) => state.applicationInfo);
  console.log(applications);
  // console.log(applications.profileId.fName);
  useEffect(() => {
    dispatch(getAllApplicationAction());
  }, [dispatch]);

  const handleOnDelete = (id) => {
    console.log("Delete application with ID:", id);
    //call api to delete application
  };

  const handleOnEdit = (id) => {
    console.log("Edit application with ID:", id);
    //navigate to edit page
    navigate(`/application-update/${id}`);
  };
  const handleOnView = (id) => {
    console.log("View application with ID:", id);
    //navigate to view page
    navigate(`/application-view/${id}`);
  };
  const columns = createColumns({
    columns: applicationBaseColumns,
    onEdit: (row) => handleOnEdit(row._id),
    onDelete: (row) => handleOnDelete(row._id),
    onView: (row) => handleOnView(row._id),
  });

  const handleOnFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredApplications = applications?.filter((app) => {
    const name = app?.profileId?.fName + " " + app?.profileId?.lName;
    const matchesSearch =
      app._id.toLowerCase().includes(filters.search.toLowerCase()) ||
      name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === "all" || app.status === filters.status;
    const matchFromDate = filters.fromDate
      ? new Date(app.date) >= new Date(filters.fromDate)
      : true;
    const matchToDate = filters.toDate
      ? new Date(app.date) <= new Date(filters.toDate)
      : true;

    return matchesSearch && matchesStatus && matchFromDate && matchToDate;
  });
  return (
    <>
      <FilterOptions
        filters={filters}
        setFilters={setFilters}
        handleOnFilterChange={handleOnFilterChange}
      />
      <CustomDataTable columns={columns} data={filteredApplications} />
    </>
  );
};

export default ApplicationList;
