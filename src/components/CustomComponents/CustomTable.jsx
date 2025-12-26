import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
const CustomTable = ({ applications, tableheading }) => {
  return (
    <>
      <Table className="border border-gray-300">
        <TableHeader>
          <TableRow className="bg-gray-50">
            {tableheading.map((heading) => (
              <TableHead key={heading} className="border">
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="border">{application.id}</TableCell>
              <TableCell className="border">{application.name}</TableCell>
              <TableCell className="border">{application.status}</TableCell>
              <TableCell className="border">{application.internship}</TableCell>
              <TableCell className="border text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">
                    {/* Update */}
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive">
                    {/* Delete */}
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CustomTable;
