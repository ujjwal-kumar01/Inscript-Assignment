import type { FC } from "react";
import * as React from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import { Plus } from "lucide-react";
import linkpic from "../assets/Link.svg"
import briefcase from "../assets/Briefcase.svg"
import calender1 from "../assets/Calendar.svg";
import reloader from "../assets/Arrow Sync.svg";
import globe from "../assets/Globe.svg";
import person from "../assets/Person.svg";
import emoji from "../assets/Emoji.svg";
import arrow from "../assets/Arrow Split (1).svg";
import arrow2 from "../assets/Arrow Split (2).svg";
import circle from "../assets/Chevron Circle.svg";
import { BreadcrumbEllipsis } from "./ui/breadcrumb";
import chevron from "../assets/Chevron.svg";    

// ────────────────── Types ──────────────────
export type SheetRow = {
    jobRequest: string;
    submitted: string;
    status: "In‑process" | "Need to start" | "Complete" | "Blocked";
    submitter: string;
    url: string;
    assigned: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string;
    estValue: number;
};

// ────────────────── Seed data (trimmed) ──────────────────
const defaultData: SheetRow[] = [
    {
        jobRequest: "Launch social media campaign for product launch",
        submitted: "15‑11‑2024",
        status: "In‑process",
        submitter: "Aisha Patel",
        url: "www.aishapatel.com",
        assigned: "Sophie Choudhury",
        priority: "Medium",
        dueDate: "20‑11‑2024",
        estValue: 6_200_000,
    },
    {
        jobRequest: "Website redesign mock‑ups for Q4 pitch deck",
        submitted: "02‑10‑2024",
        status: "Need to start",
        submitter: "Arjun Mehta",
        url: "www.arjun.design",
        assigned: "Mayank Singh",
        priority: "Low",
        dueDate: "14‑10‑2024",
        estValue: 1_450_000,
    },
    {
        jobRequest: "Translate onboarding guide to Spanish & French",
        submitted: "22‑09‑2024",
        status: "Complete",
        submitter: "Pooja Saxena",
        url: "onboarding.company.com",
        assigned: "Pooja Saxena",
        priority: "Low",
        dueDate: "30‑09‑2024",
        estValue: 330_000,
    },
    {
        jobRequest: "Migrate legacy blog content to new CMS platform",
        submitted: "28‑08‑2024",
        status: "Blocked",
        submitter: "Ravi Kapoor",
        url: "blog.legacy.com",
        assigned: "Priya Gupta",
        priority: "High",
        dueDate: "05‑09‑2024",
        estValue: 720_000,
    },
    {
        jobRequest: "Draft press release for Series‑B funding announcement",
        submitted: "18‑08‑2024",
        status: "In‑process",
        submitter: "Mina Rao",
        url: "press.company.com",
        assigned: "Sahil Joshi",
        priority: "High",
        dueDate: "22‑08‑2024",
        estValue: 910_000,
    },
];

// ────────────────── Style helpers ──────────────────
const statusClass: Record<SheetRow["status"], string> = {
    "In‑process": "bg-yellow-100 text-yellow-800",
    "Need to start": "bg-gray-100 text-gray-800",
    Complete: "bg-green-100 text-green-800",
    Blocked: "bg-red-100 text-red-800",
};
const priorityClass: Record<SheetRow["priority"], string> = {
    High: "text-red-600 font-semibold",
    Medium: "text-yellow-700 font-semibold",
    Low: "text-blue-700 font-semibold",
};

// ────────────────── Component ──────────────────
const MAX_ROWS = 100;
const ch = createColumnHelper<SheetRow>();

const Spreadsheet: FC = () => {
    const [data, setData] = React.useState<SheetRow[]>(() => [...defaultData]);

    const updateCell = (row: number, field: keyof SheetRow, value: unknown) => {
        setData((old) => {
            const copy = [...old];
            while (copy.length <= row) {
                copy.push({
                    jobRequest: "",
                    submitted: "",
                    status: "Need to start",
                    submitter: "",
                    url: "",
                    assigned: "",
                    priority: "Low",
                    dueDate: "",
                    estValue: 0,
                });
            }
            copy[row] = { ...copy[row], [field]: value } as SheetRow;
            return copy;
        });
    };

    const columns = React.useMemo<ColumnDef<SheetRow>[]>(() => {
        const groups: ColumnDef<SheetRow>[] = [
            ch.group({
                id: "row",
                header: () => <span></span>,
                columns: [
                    ch.display(
                        {
                            id: "row",
                            header: "#",
                            meta: { headerClass: "bg-gray-100 text-center text-gray-400 text-lg" },
                            size: 30,
                            cell: ({ row }) => <div className="w-full text-center ">
                                <span className="text-gray-400 font-medium ">{row.index + 1}</span>
                            </div>
                        },
            ),
                ],
            }),
            ch.group({
                id: "financial",
                header: () => 
                <span className="bg-gray-200 block px-3 " style={{padding:"8.5px"}}><div className="bg-gray-100 inline p-1 rounded"><img src={linkpic} alt='job' className="inline mr-1"></img>Q3 Financial Overview</div> <img src={reloader} alt='reload' className="inline ml-1"/></span>,
                columns: [
                    ch.accessor("jobRequest", {
                        header: () =>
                        <span className="bg-gray-100 block px-3 py-2 relative"><img src={briefcase} alt='case' className="inline mr-1"/>Job Request <img src={chevron} alt='chevron' className=" inline right-1 mt-1 absolute"></img></span>,
                        cell: ({ row }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.jobRequest}
                                onChange={(e) => updateCell(row.index, "jobRequest", e.target.value)}
                            />
                        ),
                    }),
                    ch.accessor("submitted", {
                        header: () => <span className="relative bg-gray-100 block px-3 py-2"><img src={calender1} alt='calendar' className="inline mr-1"/>Submitted <img src={chevron} alt='chevron' className=" inline right-1 mt-1 absolute"></img></span>,
                        cell: ({ row }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.submitted}
                                onChange={(e) => updateCell(row.index, "submitted", e.target.value)}
                            />
                        ),
                    }),
                    ch.accessor("status", {
                        header: () => <span className="relative bg-gray-100 block px-3 py-2"><img src={circle} alt='circle' className="inline mr-1"/>Status<img src={chevron} alt='chevron' className=" inline right-1 mt-1 absolute"></img></span>,
                        cell: ({ row }) => (
                            <div className=" flex justify-center">
                                <Badge className={cn(" px-2 py-0.5 text-xs", statusClass[row.original.status])}>
                                    {row.original.status}
                                </Badge>
                            </div>
                        ),
                    }),
                    ch.accessor("submitter", {
                        header: () => <span className="relative bg-gray-100 block px-3 py-2"><img src={person} alt='person' className="inline mr-1"/>Submitter<img src={chevron} alt='chevron' className=" inline right-1 mt-1 absolute"></img></span>,
                        cell: ({ row }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.submitter}
                                onChange={(e) => updateCell(row.index, "submitter", e.target.value)}
                            />
                        ),
                    }),
                ],
            }),
            ch.group({
                id: "urlGroup",
                header: "",
                columns: [
                    ch.accessor("url", {
                        header: () => <span className="relative bg-gray-100 block px-3 py-2"><img src={globe} alt='globe' className="inline mr-1"/>URL<img src={chevron} alt='chevron' className=" inline right-1 mt-1 absolute"></img></span>,
                        cell: ({ row }) => {
                            const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter") {
                                    const url = row.original.url;
                                    if (url) window.open(`https://${url}`, "_blank");
                                }
                            };

                            return (
                                <input
                                    type="link"
                                    title="input"
                                    className="block w-full h-full px-3 py-2 text-blue-600 underline cursor-pointer"
                                    style={{ boxSizing: "border-box" }}
                                    value={row.original.url}
                                    onChange={(e) => updateCell(row.index, "url", e.target.value)}
                                    onKeyDown={handleKey}
                                />
                            );
                        }

                    }),
                ],
            }),
            ch.group({
                id: "abc",
                header: () => <span className="bg-green-100 flex px-3 py-2"><img src={arrow2} alt='abc' className="inline mr-1 "/>ABC<BreadcrumbEllipsis className="text-gray-300 size-5 inline ml-1" /></span>,
                columns: [
                    ch.accessor("assigned", {
                        header: () => <span className="bg-green-100 block px-3 py-2"><img src={emoji} alt='emoji' className="inline mr-1"/>Assigned</span>,
                        cell: ({ row }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.assigned}
                                onChange={(e) => updateCell(row.index, "assigned", e.target.value)}
                            />
                        ),
                    }),
                ],
            }),
            ch.group({
                id: "answer",
                header: () => <span className="bg-purple-200 flex px-3 py-2 "><img src={arrow} alt='ans' className="inline mr-1"/>Answer a question<BreadcrumbEllipsis className="text-gray-300 size-5 inline ml-1" /></span>,
                columns: [
                    ch.accessor("priority", {
                        header: () => <span className="bg-purple-100 flex px-3 " style={{padding:"8.5px"}}>Priority</span>,
                        cell: ({ row }) => (
                            <input
                                className={cn(" text-center w-full h-full px-3 py-2 focus:outline-none", priorityClass[row.original.priority])}
                                style={{ boxSizing: "border-box" }}
                                value={row.original.priority}
                                onChange={(e) => updateCell(row.index, "priority", e.target.value)}
                            />
                        ),
                    }),
                    ch.accessor("dueDate", {
                        header: () => <span className="bg-purple-100 block px-3 " style={{padding:"8.5px"}}>Due Date</span>,
                        cell: ({ row }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.dueDate}
                                onChange={(e) => updateCell(row.index, "dueDate", e.target.value)}
                            />
                        ),
                    }),
                ],
            }),
            ch.group({
                id: "extract",
                header: () => <span className="bg-orange-200 flex px-3 py-2"><img src={arrow} alt='extract' className="inline mr-1"/>Extract<BreadcrumbEllipsis className="text-gray-300 size-5 inline ml-1" /></span>,
                columns: [
                    ch.accessor("estValue", {
                        header: () => <span className="bg-orange-100 block px-3 " style={{padding:"8.5px"}}>Est. Value</span>,
                        cell: ({ row }) => (

                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none "
                                style={{ boxSizing: "border-box" }}
                                value={row.original.estValue}
                                onChange={(e) => updateCell(row.index, "estValue", Number(e.target.value))}
                            />

                        ),
                    }),
                ],
            }),

            ch.group({
                id: "plus",
                meta: { headerClass: "bg-gray-100 text-center" },
                header: () => (<div className=" h-full w-30 flex items-center justify-center">
                    <Plus className="h-4 w-4 text-gray-500 cursor-pointer" />
                </div>),
                columns: [
                    ch.accessor("", {
                        id: "plus",
                        cell: () => (
                            <input
                                title="input"
                                type="text"
                                className="flex w-full h-full px-3 py-2 border-gray-200 focus:outline-none"
                            />
                        ),
                        size: 40,
                    })
                ]
    }),
        ];
return groups;
    }, []);

const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
const leafCols = table.getAllLeafColumns().filter((c) => c.id !== "row" && c.id !== "plus");

return (
    <div className="bg-white w-full">
    <div className=" max-h-screen overflow-auto">
        <table className="min-w-max text-[12px] text-gray-700 border-collapse border border-gray-200">
            <thead>
                {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                        {hg.headers.map((h) => (
                            <th
                                key={h.id}
                                colSpan={h.colSpan}
                                className={cn("border border-gray-200 text-left", h.column.columnDef.meta?.headerClass)}
                                style={{ width: h.getSize() }}
                            >
                                {flexRender(h.column.columnDef.header, h.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className="border border-gray-200 p-0 whitespace-nowrap"
                                style={{ width: cell.column.getSize() }}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}

                {Array.from({ length: Math.max(0, MAX_ROWS - data.length) }).map((_, i) => (
                    <tr key={`empty-${i}`} >
                        <td className="border border-gray-200 p-0 whitespace-nowrap text-center">
                            {data.length + i + 1}
                        </td>
                        {leafCols.map((col, j) => (
                            <td
                                key={`empty-${i}-${j}`}
                                className="border border-gray-200"
                                style={{ width: col.getSize() ?? 140 }}
                            >
                                <input
                                    title="input"
                                    className="block w-full h-full px-3 py-2 focus:outline-none"
                                    style={{ boxSizing: "border-box" }}
                                    value=""
                                    onChange={(e) => updateCell(data.length + i, col.id as keyof SheetRow, e.target.value)}
                                />
                            </td>
                        ))}
                        <td className="border border-gray-200" />
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
);
};

export default Spreadsheet;