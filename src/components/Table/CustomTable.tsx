import Link from 'next/link';
import style from './custom-table.module.scss';

type Props = {
  data: any[];
  websiteId: number;
};

export function CustomTable({ data, websiteId }: Props) {
  const thead: any[] = Object.keys(data.length > 0 ? data[0] : []);

  return (
    <table className={style.mocTable}>
      <thead className={style.mocTableHead}>
        <tr>
          {thead.map(th => {
            if (th == '__typename') return;

            return <th className={style.mocTableHeader}>{th}</th>;
          })}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map(rowData => {
          return (
            <tr>
              {thead.map(path => {
                if (path == '__typename') return;
                return (
                  <>
                    <td key={path} className={style.mocTableData}>
                      {rowData[path]}
                    </td>
                  </>
                );
              })}
              <td>
                <Link href={`/mochub/websites/${websiteId}/people/add-role/${rowData.userId}`}>
                  <a>Assign role</a>
                </Link>
                <Link href={`/mochub/websites/${websiteId}/people/add-plugin/${rowData.userId}`}>
                  <a style={{ marginLeft: 15 }}>Manage Plugin</a>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
