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
import linkpic from "../assets/Link.svg";
import briefcase from "../assets/Briefcase.svg";
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
import { isValidElement, cloneElement, type ReactElement } from "react";
import type { Row, Column } from "@tanstack/react-table";
type CellCtx = { row: Row<SheetRow>; column: Column<SheetRow, unknown> };


/* ───────── Types ───────── */
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

/* ───────── Seed data ───────── */
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

/* ───────── Style helpers ───────── */
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

/* ───────── Component ───────── */
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

    const [leafCols, setLeafCols] = React.useState<typeof table.getAllLeafColumns>([]);

    const inputRefs = React.useRef<HTMLInputElement[][]>([]);
    React.useEffect(() => {
        inputRefs.current = Array(MAX_ROWS)
            .fill(null)
            .map(() => []);
    }, []);

    const handleKeyNav = React.useCallback(
  (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIdx: number,
    colIdx: number
  ) => {
    const totalRows = MAX_ROWS;
    const totalCols = leafCols.length;

    let nextRow = rowIdx;
    let nextCol = colIdx;

    switch (e.key) {
      case 'ArrowDown':
      case 'Numpad2':
        nextRow = Math.min(rowIdx + 1, totalRows - 1);
        break;
      case 'ArrowUp':
      case 'Numpad8':
        nextRow = Math.max(rowIdx - 1, 0);
        break;
      case 'ArrowLeft':
      case 'Numpad4':
        nextCol = Math.max(colIdx - 1, 0);
        break;
      case 'ArrowRight':
      case 'Numpad6':
        nextCol = Math.min(colIdx + 1, totalCols - 1);
        break;
      default:
        return;
    }
    e.preventDefault();
    inputRefs.current[nextRow]?.[nextCol]?.focus();
  },
  [leafCols]               //  ← only changes when columns hidden/shown
);

        

    /* ── columns (unchanged content, only onKeyDown added) ── */
    const columns = React.useMemo<ColumnDef<SheetRow>[]>(() => {
        const addKeyNav =
            (colId: string) =>
                ({ row, column }: CellCtx ) =>
                    (e: React.KeyboardEvent<HTMLInputElement>) =>
                        handleKeyNav(
                            e,
                            row.index,
                            leafCols.findIndex((c) => c.id === colId || c.id === column.id)
                        );

        const groups: ColumnDef<SheetRow>[] = [
            /* # row number column unchanged */
            ch.group({
                id: "row",
                header: () => <span />,
                columns: [
                    ch.display({
                        id: "row",
                        header: "#",
                        meta: {
                            headerClass: "bg-gray-100 text-center text-gray-400 text-lg",
                        },
                        size: 30,
                        cell: ({ row }) => (
                            <div className="w-full text-center">
                                <span className="text-gray-400 font-medium">
                                    {row.index + 1}
                                </span>
                            </div>
                        ),
                    }),
                ],
            }),

            /* financial */
            ch.group({
                id: "financial",
                header: () => (
                    <span className="bg-gray-200 block px-3" style={{ padding: "8.5px" }}>
                        <div className="bg-gray-100 inline p-1 rounded">
                            <img src={linkpic} alt="job" className="inline mr-1" />
                            Q3 Financial Overview
                        </div>{" "}
                        <img src={reloader} alt="reload" className="inline ml-1" />
                    </span>
                ),
                columns: [
                    ch.accessor("jobRequest", {
                        header: () => (
                            <span className="bg-gray-100 block px-3 py-2 relative">
                                <img src={briefcase} alt="case" className="inline mr-1" />
                                Job Request
                                <img
                                    src={chevron}
                                    alt="chevron"
                                    className="inline right-1 mt-1 absolute"
                                />
                            </span>
                        ),
                        cell: ({ row, column }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.jobRequest}
                                onKeyDown={addKeyNav(column.id)}
                                onChange={(e) => updateCell(row.index, "jobRequest", e.target.value)}
                            />
                        ),
                    }),
                    ch.accessor("submitted", {
                        header: () => (
                            <span className="relative bg-gray-100 block px-3 py-2">
                                <img src={calender1} alt="calendar" className="inline mr-1" />
                                Submitted
                                <img
                                    src={chevron}
                                    alt="chevron"
                                    className="inline right-1 mt-1 absolute"
                                />
                            </span>
                        ),
                        cell: ({ row, column }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.submitted}
                                onKeyDown={addKeyNav(column.id)}
                                onChange={(e) => updateCell(row.index, "submitted", e.target.value)}
                            />
                        ),
                    }),
                    ch.accessor("status", {
                        header: () => (
                            <span className="relative bg-gray-100 block px-3 py-2">
                                <img src={circle} alt="circle" className="inline mr-1" />
                                Status
                                <img
                                    src={chevron}
                                    alt="chevron"
                                    className="inline right-1 mt-1 absolute"
                                />
                            </span>
                        ),
                        cell: ({ row }) => (
                            <div className="flex justify-center">
                                <Badge
                                    className={cn(
                                        "px-2 py-0.5 text-xs",
                                        statusClass[row.original.status]
                                    )}
                                >
                                    {row.original.status}
                                </Badge>
                            </div>
                        ),
                    }),
                    ch.accessor("submitter", {
                        header: () => (
                            <span className="relative bg-gray-100 block px-3 py-2">
                                <img src={person} alt="person" className="inline mr-1" />
                                Submitter
                                <img
                                    src={chevron}
                                    alt="chevron"
                                    className="inline right-1 mt-1 absolute"
                                />
                            </span>
                        ),
                        cell: ({ row, column }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.submitter}
                                onKeyDown={addKeyNav(column.id)}
                                onChange={(e) => updateCell(row.index, "submitter", e.target.value)}
                            />
                        ),
                    }),
                ],
            }),

            /* urlGroup */
            ch.group({
                id: "urlGroup",
                header: "",
                columns: [
                    ch.accessor("url", {
                        header: () => (
                            <span className="relative bg-gray-100 block px-3 py-2">
                                <img src={globe} alt="globe" className="inline mr-1" />
                                URL
                                <img
                                    src={chevron}
                                    alt="chevron"
                                    className="inline right-1 mt-1 absolute"
                                />
                            </span>
                        ),
                        cell: ({ row, column }) => {
                            const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === "Enter") {
                                    const url = row.original.url;
                                    if (url) window.open(`https://${url}`, "_blank");
                                }
                            };
                            return (
                                <input
                                    title="input"
                                    type="link"
                                    className="block w-full h-full px-3 py-2 text-blue-600 underline cursor-pointer"
                                    style={{ boxSizing: "border-box" }}
                                    value={row.original.url}
                                    onKeyDown={(e) => {
                                        addKeyNav(column.id)(e);
                                        handleKey(e);
                                    }}
                                    onChange={(e) => updateCell(row.index, "url", e.target.value)}
                                />
                            );
                        },
                    }),
                ],
            }),

            /* abc */
            ch.group({
                id: "abc",
                header: () => (
                    <span className="bg-green-100 flex px-3 py-2">
                        <img src={arrow2} alt="abc" className="inline mr-1" />
                        ABC
                        <BreadcrumbEllipsis className="text-gray-300 size-5 inline ml-1" />
                    </span>
                ),
                columns: [
                    ch.accessor("assigned", {
                        header: () => (
                            <span className="bg-green-100 block px-3 py-2">
                                <img src={emoji} alt="emoji" className="inline mr-1" />
                                Assigned
                            </span>
                        ),
                        cell: ({ row, column }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.assigned}
                                onKeyDown={addKeyNav(column.id)}
                                onChange={(e) => updateCell(row.index, "assigned", e.target.value)}
                            />
                        ),
                    }),
                ],
            }),

            /* answer */
            ch.group({
                id: "answer",
                header: () => (
                    <span className="bg-purple-200 flex px-3 py-2">
                        <img src={arrow} alt="ans" className="inline mr-1" />
                        Answer a question
                        <BreadcrumbEllipsis className="text-gray-300 size-5 inline ml-1" />
                    </span>
                ),
                columns: [
                    ch.accessor("priority", {
                        header: () => (
                            <span
                                className="bg-purple-100 flex px-3"
                                style={{ padding: "8.5px" }}
                            >
                                Priority
                            </span>
                        ),
                        cell: ({ row, column }) => (
                            <input
                                className={cn(
                                    "text-center w-full h-full px-3 py-2 focus:outline-none",
                                    priorityClass[row.original.priority]
                                )}
                                style={{ boxSizing: "border-box" }}
                                value={row.original.priority}
                                onKeyDown={addKeyNav(column.id)}
                                onChange={(e) => updateCell(row.index, "priority", e.target.value)}
                            />
                        ),
                    }),
                    ch.accessor("dueDate", {
                        header: () => (
                            <span
                                className="bg-purple-100 block px-3"
                                style={{ padding: "8.5px" }}
                            >
                                Due Date
                            </span>
                        ),
                        cell: ({ row, column }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.dueDate}
                                onKeyDown={addKeyNav(column.id)}
                                onChange={(e) => updateCell(row.index, "dueDate", e.target.value)}
                            />
                        ),
                    }),
                ],
            }),

            /* extract */
            ch.group({
                id: "extract",
                header: () => (
                    <span className="bg-orange-200 flex px-3 py-2">
                        <img src={arrow} alt="extract" className="inline mr-1" />
                        Extract
                        <BreadcrumbEllipsis className="text-gray-300 size-5 inline ml-1" />
                    </span>
                ),
                columns: [
                    ch.accessor("estValue", {
                        header: () => (
                            <span
                                className="bg-orange-100 block px-3"
                                style={{ padding: "8.5px" }}
                            >
                                Est. Value
                            </span>
                        ),
                        cell: ({ row, column }) => (
                            <input
                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                style={{ boxSizing: "border-box" }}
                                value={row.original.estValue}
                                onKeyDown={addKeyNav(column.id)}
                                onChange={(e) =>
                                    updateCell(row.index, "estValue", Number(e.target.value))
                                }
                            />
                        ),
                    }),
                ],
            }),

            /* plus */
            ch.group({
                id: "plus",
                meta: { headerClass: "bg-gray-100 text-center" },
                header: () => (
                    <div className="h-full w-30 flex items-center justify-center">
                        <Plus className="h-4 w-4 text-gray-500 cursor-pointer" />
                    </div>
                ),
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
                    }),
                ],
            }),
        ];
        return groups;
    }, [handleKeyNav, leafCols]);

    /* ── table instance ── */
    const table = useReactTable({
    data,
    columns,
    defaultColumn: { minSize: 1, size: 140, enableResizing: true },
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    debugTable: true, // 👈 logs table lifecycle info to console
});


    /* ── collapse helper ── */
    

const hideWhenCollapsed = (col: Column<SheetRow, unknown>) => {
    if (col.getSize() < 35) {
        col.toggleVisibility(false);
    }
};




    React.useEffect(() => {
        const all = table.getAllLeafColumns().filter((c) => c.id !== "row" && c.id !== "plus");
        setLeafCols(all);
    }, [table]);


    /* ── render ── */
    return (
        <div className="bg-white w-full">
            <div className="max-h-screen overflow-auto overflow-x-auto">
                <table className="min-w-max text-[12px] text-gray-700 border-collapse border border-gray-200">
                    <thead>
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id}>
                                {hg.headers.map((h) => (
                                    <th
                                        key={h.id}
                                        colSpan={h.colSpan}
                                        className={cn(
                                            "border border-gray-200 text-left relative whitespace-nowrap overflow-hidden",
                                            h.column.columnDef.meta?.headerClass
                                        )}
                                        style={{ width: h.getSize() }}
                                    >
                                        {flexRender(h.column.columnDef.header, h.getContext())}
                                        {h.column.getCanResize() && (
                                            <div
                                                onMouseDown={h.getResizeHandler()}
                                                onTouchStart={h.getResizeHandler()}
                                                onMouseUp={() => hideWhenCollapsed(h.column)}
                                                onDoubleClick={() => h.column.toggleVisibility(false)}
                                                className="absolute right-0 top-0 h-full w-0.5 cursor-col-resize bg-gray-300 select-none"
                                            />
                                        )}
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
                                        className="border border-gray-200 p-0 whitespace-nowrap overflow-hidden"
                                        style={{ width: cell.column.getSize() }}
                                    >
                                        {(() => {
                                            const rendered = flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            );

                                            // If the cell renders an <input>, enhance it with ref + key nav:
                                            if (
                                                isValidElement(rendered) &&
                                                typeof rendered.type === "string" &&
                                                rendered.type === "input"
                                            ) {
                                                return cloneElement(rendered as ReactElement, {
                                                    ref: (el: HTMLInputElement | null) => {
                                                        if (el) {
                                                            if (!inputRefs.current[row.index]) inputRefs.current[row.index] = [];
                                                            inputRefs.current[row.index][cell.column.getIndex()] = el;
                                                        }
                                                    },
                                                    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
                                                        handleKeyNav(e, row.index, cell.column.getIndex()),
                                                });
                                            }

                                            // Otherwise just render whatever the column provided:
                                            return rendered;
                                        })()}
                                    </td>

                                ))}
                            </tr>
                        ))}

                        {/* empty rows */}
                        {Array.from({ length: Math.max(0, MAX_ROWS - data.length) }).map(
                            (_, i) => (
                                <tr key={`empty-${i}`}>
                                    <td className="border border-gray-200 p-0 text-center whitespace-nowrap overflow-hidden">
                                        {data.length + i + 1}
                                    </td>
                                    {leafCols.map((col, j) => (
                                        <td
                                            key={`empty-${i}-${j}`}
                                            className="border border-gray-200 whitespace-nowrap overflow-hidden"
                                            style={{ width: col.getSize() ?? 140 }}
                                        >
                                            <input
                                                title="input"
                                                className="block w-full h-full px-3 py-2 focus:outline-none"
                                                style={{ boxSizing: "border-box" }}
                                                value=""
                                                onKeyDown={(e) =>
                                                    handleKeyNav(
                                                        e,
                                                        data.length + i,
                                                        leafCols.findIndex((c) => c.id === col.id)
                                                    )
                                                }

                                                ref={(el) => {
                                                    if (!inputRefs.current[data.length + i]) inputRefs.current[data.length + i] = [];
                                                    inputRefs.current[data.length + i][leafCols.findIndex((c) => c.id === col.id)] = el!;
                                                }}

                                                onChange={(e) =>
                                                    updateCell(
                                                        data.length + i,
                                                        col.id as keyof SheetRow,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    ))}
                                    <td className="border border-gray-200" />
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Spreadsheet;