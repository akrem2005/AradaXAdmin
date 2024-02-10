import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function PendingPage() {
  return (
    <>
      <Helmet>
        <title> Pending | AradaX </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
