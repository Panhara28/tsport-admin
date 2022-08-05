import { gql } from 'apollo-boost';
import React, { useState } from 'react';
import { Form } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { Card } from 'reactstrap';
import { CategoryForm } from '../../components/Custom/Product/Category';
import { TsContent } from '../../components/Custom/TsContent';
import XForm from '../../components/Form/XForm';
import toastr from 'toastr';
import { CreateUpdateForm, CreateUpdateProps } from '../../components/GraphQL/CreateUpdateForm';

const CREATE = gql`
  mutation createCategory($input: CategoryInput) {
    createCategory(data: $input)
  }
`;

const UPDATE = gql`
  mutation updateCategory($input: CategoryInput, $id: Int!) {
    updateCategory(id: $id, data: $input)
  }
`;

const QUERY = gql`
  query category($id: Int!) {
    category(id: $id) {
      id
      name
      parents
      parent
    }
  }
`;

const FormBody = ({ update, defaultValues, isEditingMode }: CreateUpdateProps<any, any>) => {
  const [name, setName] = useState(defaultValues.name);
  const [parent, setParent] = useState(defaultValues.parent);

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      name,
      parent,
    };

    if (isEditingMode) {
      if (defaultValues.id === parent) {
        return toastr.error('Category id and parent category id are the the same.');
      }

      update({
        input: data,
      });
    } else {
      update({
        ...data,
      });
    }
  };

  return (
    <Form onSubmit={onHandleSubmit}>
      <XForm.Text
        label="Name"
        placeholder="Enter category name"
        value={name}
        onChange={e => setName(e.currentTarget.value)}
      />
      <div className="form-group">
        <CategoryForm onChange={setParent} categoryId={parent} />
      </div>
      <XForm.Button>Save</XForm.Button>
    </Form>
  );
};

export function CreateCategoryScreen({ id }: { id?: number }) {
  return (
    <TsContent title={id ? 'Edit Category' : 'Create Category'}>
      <div className="row">
        <div className="col-md-6">
          <Card>
            <CardBody>
              <CreateUpdateForm
                id={id}
                body={FormBody}
                create={CREATE}
                update={UPDATE}
                query={QUERY}
                refectQuery="categoryList, category"
              />
            </CardBody>
          </Card>
        </div>
      </div>
    </TsContent>
  );
}
