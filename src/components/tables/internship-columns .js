import { Link } from "react-router-dom";
export const internshipBaseColumns = [
  {
    accessorKey: "_id",
    header: "Internship ID",
  },
  // {
  //   header: "Posted By",
  //   accessorFn: (row) => `${row.profileId.fName} ${row.profileId.lName}`,
  // },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "company",
    header: "Company",
  },

  {
    accessorFn: (row) => row.createdAt?.slice(0, 10),
    header: "Internship Date",
  },
];
