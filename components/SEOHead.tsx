import Head from 'next/head';

export function SEOHead() {
  return (
    <Head>
      <title>Mekana</title>
      <link
        rel='icon'
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>"
      />
      <meta
        name='description'
        content='Engenharia para montar Mechas'
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1'
      />
      <meta
        property='og:title'
        content='Mekana'
      />
      <meta
        property='og:description'
        content='Engenharia para montar Mechas'
      />
      <meta
        property='og:image'
        content='images/logo_icon.png '
      />
    </Head>
  );
}
