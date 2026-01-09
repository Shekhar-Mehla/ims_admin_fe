import { Link } from "react-router-dom";
export const applicationBaseColumns = [
  {
    accessorKey: "_id",
    header: "Application ID",
    // cell: ({ row }) => (
    //   <Link
    //     to={`/applications/${row.original._id}`}
    //     className="text-primary hover:underline font-medium"
    //   >
    //     {row.getValue("_id")}
    //   </Link>
    // ),
  },
  {
    header: "Applicant Name",
    accessorFn: (row) => `${row.profileId?.fName} ${row.profileId?.lName}`,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    header: "Internship For",
    accesssorFn: (row) => row.internshipId.title,
  },
  {
    accessorFn: (row) => row.createdAt?.slice(0, 10),
    header: "Application Date",
    // cell: (row) => {
    //   const date = row.getValue("createdAt");
    //   return date ? date.slice(0, 10) : "";
    // },
  },
];
