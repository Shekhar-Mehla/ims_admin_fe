export const userBaseColumns = [
    {
      accessorKey: "fName",
      header: "First Name",
    },
    {
      accessorKey: "lName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "isVerified",
      header: "Verified",
      cell: ({ row }) => (row.original.isVerified ? "Yes" : "No"),
    },
  ];
