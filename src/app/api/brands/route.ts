import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';
import { IItem } from '@/lib/interfaces/item';

export async function POST(request: NextRequest) {
  const body: IItem = await request.json();

  if (
    !body ||
    !body.name ||
    !body.selector ||
    !body.url ||
    (!body.basePrice && body.basePrice !== 0)
  ) {
    throw new Error(
      `body must have correct values, recieved: ${JSON.stringify(body)}`
    );
  }

  const response = await fetch(body.url, {
    headers: {
      'Content-Type': 'text/html',
    },
  });

  const data = await response.text();

  const dom = new JSDOM(data);
  const priceEls = dom.window.document.querySelectorAll(body.selector);

  let price = null;
  if (priceEls.item(0)) {
    let priceString = priceEls.item(0).textContent;
    if (priceString) {
      if (priceString.includes('€')) {
        price = priceString.replace('€', '');
        price = price.replaceAll(',', '.');
        console.log(price);
        price = parseFloat(price);
        console.log(price);
      }
    }
  }

  // TODO: add error responses
  return NextResponse.json({
    status: 'ok',
    data: {
      item: body,
      currentPrice: price,
    },
  });
}
