import { IPriceItem } from '@/types/database';
import SubmitButton from './Submit';
import Field from './Fields';

const Form = ({
  action,
  initialValues,
}: {
  action: string | ((formData: FormData) => void);
  initialValues?: IPriceItem;
}) => {
  return (
    <form action={action} className='flex flex-col gap-2'>
      <div>
        <div className='flex gap-2'>
          <Field
            name='name'
            label='Name'
            required
            defaultValue={initialValues ? initialValues.name : undefined}
          />
          <Field
            name='url'
            label='Url'
            required
            defaultValue={initialValues ? initialValues.url : undefined}
          />
        </div>

        <div className='flex gap-2'>
          <Field
            name='css_selector'
            label='Selector'
            required
            defaultValue={
              initialValues ? initialValues.css_selector : undefined
            }
          />
          <Field
            name='base_price'
            label='BasePrice'
            type='number'
            step='0.01'
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
