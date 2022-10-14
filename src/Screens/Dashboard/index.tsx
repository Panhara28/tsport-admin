import { useQuery } from '@apollo/client';
import { gql } from 'apollo-boost';
import { Breadcrumb } from '../../components/Common/Breadcrumb';
import Layout from '../../components/VerticalLayout';
import { setting } from '../../libs/settings';

const QUERY = gql`
  query summaryReport($start: String, $end: String) {
    summaryReport(start: $start, end: $end)
  }
`;

const dummy = [
  {
    id: 'total_order',
    text: 'Total Order',
    bg: 'bg-primary'
  },
  {
    id: 'total_sell',
    text: 'Total Sells',
    bg: 'bg-success'
  },
  {
    id: 'total_return',
    text: 'Total Return',
    bg: 'bg-danger'
  },
  {
    id: 'order_pending',
    text: 'Order Pending',
    bg: 'bg-warning'
  },
  {
    id: 'order_process',
    text: 'Order Processing',
    bg: 'bg-info'
  },
  {
    id: 'order_delivered',
    text: 'Order Delivered',
    bg: 'bg-secondary'
  },
  {
    id: 'customers',
    text: 'Customer',
  },
  {
    id: 'users',
    text: 'User',
  },
  {
    id: 'products',
    text: 'of products',
  }
]

export function DashboardScreen() {
  const { data, loading } = useQuery(QUERY);

  if (loading) return <div></div>;

  return (
    <Layout>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="Dashboard" title={setting.title} />
        <hr />
        {data && (
          <div className="row">
            {
              dummy.map(x => {

                if(x.id === 'customers' || x.id === 'users') {
                  return (
                    <div className="col-md-4" key={x.id}>
                    <div className={`card ${x.bg}`} style={{ height: 134, borderRadius: 7 }}>
                      <div className="card-body grow text-center">
                        <div>
                          <div className='text-mute m-0 value' style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <span className='text-primary'> <i className={`fa fa-${x.id === 'users' ? 'user-secret': 'user'}`}></i> {data.summaryReport[x.id].active}</span>
                            <span>~</span>
                            <span className='text-danger'> <i className={`fa fa-${x.id === 'users' ? 'user-injured': 'user-times'}`}></i>({data.summaryReport[x.id].inactive})</span>
                          </div>
                          <h6 className='text-mute m-0 label'>{x.text}</h6>
                          {/* <h6 className='text-mute m-0 label'>{x.text}:</h6>
                          <h6 className='text-mute m-0 label'>- Active: #{data.summaryReport[x.id].active}</h6>
                          <h6 className='text-mute m-0 label'>- Inactive: #{data.summaryReport[x.id].inactive}</h6> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                }

                if(x.id === 'products') {
                  return (
                    <div className="col-md-4" key={x.id}>
                    <div className={`card ${x.bg}`} style={{ height: 134, borderRadius: 7 }}>
                      <div className="card-body grow text-center">
                        <div>
                          <h3 className='text-primary m-0 value'>#{data.summaryReport[x.id]} {x.text}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                }

                const currency = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })
                return (
                  <div className="col-md-4" key={x.id}>
                    <div className={`card ${x.bg}`} style={{ height: 134, borderRadius: 7 }}>
                      <div className="card-body grow text-center">
                        <div>
                          <h3 className='text-light m-0 value'>{currency.format(data.summaryReport[x.id])}</h3>
                          <h6 className='text-light m-0 label'>{x.text}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )}
      </div>
    </Layout>
  );
}
