/* eslint-disable @next/next/no-img-element */
type Props = {
  name: string;
  fullname: string;
};

export const Card = ({ fullname, name }: Props) => {
  return (
    <div className="moc-card">
      <div className="moc-card-body">
        <div className="moc-card-icon-container">
          <span className="moc-card-icon">
            <img src="/icons/js.png" alt="" />
          </span>
        </div>
        <h6 className="moc-card-app">{name}</h6>
        <span className="moc-card-username">{fullname}</span>
      </div>
    </div>
  );
};
