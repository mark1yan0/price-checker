import { IPriceItem } from '@/types/database';
import SubmitButton from './Submit';
import Field from './Fields';
import { twMerge } from 'tailwind-merge';

const Form = ({
  action,
  columns = 3,
  initialValues,
}: {
  action: string | ((formData: FormData) => void);
  initialValues?: IPriceItem;
  columns?: number;
}) => {
  return (
    <form action={action} className="flex flex-col gap-2">
      <div>
        <Field
          name="name"
          required
          variant="title"
          placeholder="Insert name"
          label="Name"
          className="mb-6"
          defaultValue={initialValues ? initialValues.name : undefined}
        />

        <div
          className={twMerge(
            'flex flex-col gap-2 md:flex-row',
            columns === 1 ? 'md:flex-col' : null,
          )}
        >
          <Field
            name="url"
            label="Url"
            required
            defaultValue={initialValues ? initialValues.url : undefined}
          />
          <Field
            name="css_selector"
            label="Selector"
            required
            defaultValue={
              initialValues ? initialValues.css_selector : undefined
            }
          />
          <Field
            name="base_price"
            label="BasePrice"
            type="number"
            step="0.01"
            required
            defaultValue={initialValues ? initialValues.base_price : undefined}
          />
        </div>
      </div>

      <SubmitButton text={initialValues ? 'Update' : 'Create'} />
    </form>
  );
};

export default Form;
