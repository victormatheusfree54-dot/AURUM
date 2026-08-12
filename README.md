# Aurum Beauty Concept — site institucional

Site responsivo em React 19 com Next.js/vinext, visual editorial, avaliações, localização, baralho interativo do salão e comparadores de antes e depois.

## Rodar no computador

1. Abra o terminal nesta pasta.
2. Execute `npm install`.
3. Execute `npm run dev`.
4. Abra `http://localhost:3000`.

## Trocar as fotos

As imagens otimizadas ficam em `public/images`. O site usa AVIF como primeira opção e WebP como fallback nas transformações, com variantes de 480, 720, 800 e 1200 pixels. As fotos do salão usam WebP em 480, 720 e 1200 pixels.

Ao substituir uma foto, mantenha o nome-base e gere novamente as variantes. Exemplos:

- `modelo-frente-antes` e `modelo-frente-depois`: destaque principal.
- `transformacao-1-antes` até `transformacao-4-depois`: comparadores.
- `salao-hall-principal`, `salao-aurum-recreio`, `salao-nail-design` e `salao-estacoes-beleza`: baralho do salão.

Não coloque JPEG ou PNG fotográfico diretamente na página. Converta para WebP/AVIF e mantenha a proporção original.

## Atualizar contato

O Instagram e o endereço já estão configurados. Quando houver telefone/WhatsApp e horário oficial, adicione essas informações em `src/app/page.tsx`.

## SEO e endereço público

O projeto inclui title e metatags, Open Graph/Twitter Preview 1200×630, conjunto completo de favicons, manifest, JSON-LD do salão, `robots.txt`, `sitemap.xml` e `llms.txt`.

O fallback usa a URL pública atual. Para trocar o domínio, copie `.env.example` para `.env.local` ou configure a variável na hospedagem:

```env
NEXT_PUBLIC_SITE_URL=https://www.seudominio.com.br
```

Depois gere uma nova versão com `npm run build`. Assim, canonical, Open Graph, JSON-LD, sitemap e robots passam a usar o domínio correto automaticamente.

## Gerar versão final

Execute `npm run build`. O pacote de produção compatível com a hospedagem será criado na pasta `dist`, incluindo versões Brotli/Gzip pré-comprimidas dos arquivos estáticos.
