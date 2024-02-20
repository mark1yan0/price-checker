import { NextRequest, NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';
import { IPriceItem } from '@/types/database';

export async function POST(request: NextRequest) {
  const body: IPriceItem = await request.json();

  if (
    !body ||
    !body.name ||
    !body.css_selector ||
    !body.url ||
    (!body.base_price && body.base_price !== 0)
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
  const priceEls = dom.window.document.querySelectorAll(body.css_selector);

  let price = null;
  if (priceEls.item(0)) {
    let priceString = priceEls.item(0).textContent;
    if (priceString) {
      if (priceString.includes('€')) {
        price = priceString.replace('€', '');
        price = price.replaceAll(',', '.');
        price = parseFloat(price);
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
