import { DraftProduct } from '../../components/Custom/Product/DraftProduct';
import { TsContent } from '../../components/Custom/TsContent';

export function CreateProductScreen() {
  return (
    <TsContent title="Upload Product">
      <div className="row">
        <div className="col-6">
          <DraftProduct />
        </div>
      </div>
    </TsContent>
  );
}
