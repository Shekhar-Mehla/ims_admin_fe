import React, { useEffect, useState } from "react";

import FilterOptions from "../../components/CustomComponents/FilterOptions";

import CustomTable from "../../components/CustomComponents/CustomTable";
// import { DataTable } from "@/components/ui/data-table";
import { createColumns } from "@/components/tables/create-columns";
import { applicationBaseColumns } from "@/components/tables/application-columns.js";
import CustomDataTable from "../../components/CustomComponents/CustomDataTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteInternshipByIdActions,
  fetchInternshipActions,
} from "../../features/internship/internshipaction";
import { internshipBaseColumns } from "../../components/tables/internship-columns ";

const AllInternship = () => {
  const [filters, setFilters] = useState({
    search: "",
    // status: "all",
    fromDate: "",
    toDate: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { internships } = useSelector((state) => state.internshipInfo);
  console.log(internships);
  // console.log(internships.profileId.fName);
  useEffect(() => {
    dispatch(fetchInternshipActions());
  }, [dispatch]);

  const handleOnDelete = async (id) => {
    dispatch(deleteInternshipByIdActions(id));
  };

  const handleOnEdit = (slug) => {
    console.log("Edit application with ID:", slug);
    //navigate to edit page
    navigate(`/update_internship/${slug}`);
  };

  const columns = createColumns({
    columns: internshipBaseColumns,
    onEdit: (row) => handleOnEdit(row.slug),
    onDelete: (row) => handleOnDelete(row._id),
  });

  const handleOnFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredApplications = internships.filter((app) => {
    // const name = app.profileId.fName + " " + app.profileId.lName;
    // const matchesSearch =
    //   app._id.toLowerCase().includes(filters.search.toLowerCase()) ||
    //   name.toLowerCase().includes(filters.search.toLowerCase());

    const matchFromDate = filters.fromDate
      ? new Date(app.date) >= new Date(filters.fromDate)
      : true;
    const matchToDate = filters.toDate
      ? new Date(app.date) <= new Date(filters.toDate)
      : true;

    return matchFromDate && matchToDate;
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

export default AllInternship;
