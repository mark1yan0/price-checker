'use client';

const Form = () => {
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.currentTarget.value);
    const target = e.target as typeof e.target & {
      name: { value: string };
      url: { value: string };
      selector: { value: string };
      basePrice: { value: number };
    };

    const itemsList = localStorage.getItem('list');

    if (itemsList) {
      const parsed = JSON.parse(itemsList);
      localStorage.setItem(
        'list',
        JSON.stringify({
          ...parsed,
          [target.name.value]: {
            url: target.url.value,
            selector: target.selector.value,
            basePrice: target.basePrice.value,
          },
        })
      );
    } else {
      localStorage.setItem(
        'list',
        JSON.stringify({
          [target.name.value]: {
            url: target.url.value,
            selector: target.selector.value,
            basePrice: target.basePrice.value,
          },
        })
      );
    }
  }

  // TODO: add update, use db
  return (
    <form onSubmit={submitHandler} className='flex flex-col gap-2'>
      <label htmlFor='name'>
        Name <input type='text' name='name' />
      </label>

      <label htmlFor='url'>
        Url <input type='text' name='url' />
      </label>

      <label htmlFor='selector'>
        Selector <input type='text' name='selector' />
      </label>

      <label htmlFor='basePrice'>
        BasePrice <input type='number' step='0.01' name='basePrice' />
      </label>

      <input type='submit' value='submit' />
    </form>
  );
};

export default Form;
