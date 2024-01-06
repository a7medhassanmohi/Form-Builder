import React, { ReactNode } from 'react'
import { ElementsType, FormElementInstance } from './FormElements';
import { GetFormWithSubmissions } from '@/actions/form';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { formatDistance } from 'date-fns';

type Props = {
    id:number
}

type Row = { [key: string]: string } & {
    submittedAt: Date;
  };
  type Columns= {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }



const SubmissionsTable = async ({id}: Props) => {
    const form = await GetFormWithSubmissions(id);
    if (!form) {
        throw new Error("form not found");
      }
      const formElements = JSON.parse(form.content) as FormElementInstance[];
      const columns:Columns[]=[]
      formElements.forEach((element) => {
        switch (element.type) {
          case "TextField":
            columns.push({
              id: element.id,
              label: element.extraAttributes?.label,
              required: element.extraAttributes?.required,
              type: element.type,
            });
            break;
          default:
            break;
        }
      });

      const rows: Row[] = [];
      form.FormSubmissions.forEach((submission) => {
        const content = JSON.parse(submission.content);
        rows.push({
          ...content,
          submittedAt: submission.createdAt,
        });
      });
  return  ( 
    !!form.FormSubmissions.length && (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">Submitted at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <RowCell key={column.id} type={column.type} value={row[column.id]} />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      </>
      )
  )
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
    let node: ReactNode = value;
  
  
    return <TableCell>{node}</TableCell>;
  }
  

export default SubmissionsTable