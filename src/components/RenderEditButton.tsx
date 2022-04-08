import { Button } from 'react-bootstrap';

type Props = {
  status: string;
  onSubmit?: any;
};

export function RenderEditButton({ status, onSubmit }: Props) {
  if (status === 'INREVIEW') {
    return <></>;
  } else if (status === 'REVERSION') {
    return (
      <Button
        variant="primary"
        type="submit"
        style={{ width: '100%', margin: '10px 0px 10px 0px' }}
        onClick={e => onSubmit(e)}
      >
        Save Draft
      </Button>
    );
  } else if (status === 'PUBLISHED') {
    return <></>;
  }

  return (
    <Button
      variant="primary"
      type="submit"
      style={{ width: '100%', margin: '10px 0px 10px 0px' }}
      onClick={e => onSubmit(e)}
    >
      Save Draft
    </Button>
  );
}
