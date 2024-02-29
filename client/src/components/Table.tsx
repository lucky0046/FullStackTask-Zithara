import { Customer } from "@/App";
import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCaption,
  TableFooter,
} from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DataTableProps {
  data: Array<Customer>;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [studentsData, setStudentsData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "time" | "default">("default");
  const studentsPerPage = 20;

  useEffect(() => {
    setStudentsData(data);
    setCurrentPage(1);
  }, [data]);

  const filteredStudents = studentsData.filter((student) => {
    return (
      student.customer_name.toLowerCase().includes(filterText.toLowerCase()) ||
      student.location.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "time":
        return (
          parseInt(a.created_at.split("T")[1].split(".")[0]) -
          parseInt(b.created_at.split("T")[1].split(".")[0])
        );
      default:
        return 0;
    }
  });

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold">List Of Customers</h1>
        <p className="text-gray-500">Here is the list of your customers</p>
      </div>
      <div className="flex gap-4 justify-between">
        <Input
          placeholder="Filter by name or location.."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-[300px]"
        />
        <Select
          onValueChange={(value) =>
            setSortBy(value as "date" | "time" | "default")
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="time">Time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table className="border border-gray-300 rounded-md">
        <TableCaption>A list of your recent Customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SNo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStudents.map((student) => (
            <TableRow key={student.sno}>
              <TableCell className="font-medium">{student.sno}</TableCell>
              <TableCell>{student.customer_name}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.location}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>{student.created_at.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                {student.created_at.split("T")[1].split(".")[0]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={` ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
              >
                Previous
              </Button>
            </TableCell>
            <TableCell className="">
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(studentsData.length / studentsPerPage)
                }
                className={` ${
                  currentPage ===
                  Math.ceil(studentsData.length / studentsPerPage)
                    ? "cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
